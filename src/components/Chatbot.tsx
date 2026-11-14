import { useState, useEffect, useRef, useCallback } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  ONETAG_KEY,
  isPlaceholderKey,
  EDA_CHATBOT_NAME,
  EDA_CHATBOT_WELCOME_MESSAGE,
  EDA_CHATBOT_SYSTEM_PROMPT,
  extractPageContext,
  getStarterQuestions,
  getEducationalFallbackResponse,
} from "@/lib/onetag";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

/**
 * Helper to render structured markdown-like text with code blocks and copy buttons.
 */
function FormattedMessage({ content }: { content: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split content by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          let language = "";
          let code = part.slice(3, -3);

          if (lines[0] && /^[a-zA-Z0-9_-]+$/.test(lines[0].trim())) {
            language = lines[0].trim();
            code = lines.slice(1).join("\n");
          }

          return (
            <div
              key={index}
              className="my-2 overflow-hidden rounded-lg border border-border bg-muted/90 text-foreground"
            >
              <div className="flex items-center justify-between border-b border-border/60 bg-muted px-3 py-1 text-xs text-muted-foreground">
                <span>{language || "code"}</span>
                <button
                  type="button"
                  onClick={() => copyCode(code.trim(), index)}
                  className="inline-flex items-center gap-1 text-xs transition-colors hover:text-foreground"
                  aria-label="Copy code"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-3 text-xs font-mono leading-normal">
                <code>{code.trim()}</code>
              </pre>
            </div>
          );
        }

        // Render plain text paragraphs, converting ### headers and bullet points
        return (
          <div key={index} className="space-y-1.5 whitespace-pre-wrap">
            {part
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, pIdx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h4
                      key={pIdx}
                      className="mt-2 text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      {paragraph.replace("### ", "")}
                    </h4>
                  );
                }
                return (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-welcome",
      role: "assistant",
      content: EDA_CHATBOT_WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const starterQuestions = getStarterQuestions(pathname);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on open
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, scrollToBottom]);

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: EDA_CHATBOT_WELCOME_MESSAGE,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (userPrompt?: string) => {
    const query = (userPrompt || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    const assistantMsgId = `assistant-${Date.now()}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setInput("");
    setIsLoading(true);

    // Extract dynamic page context for this query
    const pageContext = extractPageContext();

    try {
      // Check if OneTag AI SDK is loaded on window and has a live key
      if (typeof window !== "undefined" && window.onetag && !isPlaceholderKey(ONETAG_KEY)) {
        let accumulatedText = "";

        // Format history for OneTag API (excluding the current turn)
        const history = messages
          .filter((m) => m.id !== "initial-welcome")
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const result = await window.onetag.ask(query, pageContext, {
          system: EDA_CHATBOT_SYSTEM_PROMPT,
          history,
          stream: (delta: string) => {
            accumulatedText += delta;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId
                  ? { ...msg, content: accumulatedText, isStreaming: true }
                  : msg,
              ),
            );
          },
        });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? {
                  ...msg,
                  content: result || accumulatedText,
                  isStreaming: false,
                }
              : msg,
          ),
        );
      } else {
        // Fallback / Preview Mode: generate educational answer using prompt knowledge & page context
        await new Promise((resolve) => setTimeout(resolve, 350));
        const educationalResponse = getEducationalFallbackResponse(query, pageContext);

        // Stream fallback text smoothly
        const words = educationalResponse.split(" ");
        let streamed = "";
        for (let i = 0; i < words.length; i++) {
          streamed += (i > 0 ? " " : "") + words[i];
          if (i % 4 === 0 || i === words.length - 1) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId ? { ...msg, content: streamed, isStreaming: true } : msg,
              ),
            );
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: educationalResponse, isStreaming: false }
              : msg,
          ),
        );
      }
    } catch (err: unknown) {
      console.warn("OneTag AI invocation failed, using educational fallback:", err);
      const fallback = getEducationalFallbackResponse(query, pageContext);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, content: fallback, isStreaming: false } : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentPageLabel = pathname.includes("/projects/")
    ? `Project: ${pathname.replace("/projects/", "").replace(/\/$/, "")}`
    : "Home: Foundations";

  return (
    <>
      {/* Floating Chatbot Launcher Button */}
      <button
        id="chatbot-launcher"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Eddie" : "Open Eddie, your EDA learning assistant"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-primary-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
      >
        {isOpen ? (
          <X className="h-5 w-5 transition-transform duration-200 rotate-90" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        )}
      </button>

      {/* Backdrop for mobile & tablet (closed by tapping outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Chatbot Modal / Panel */}
      {isOpen && (
        <section
          id="chatbot-panel"
          aria-label="Eddie - EDA Learning Assistant"
          className="fixed bottom-20 right-4 left-4 z-50 flex h-[580px] max-h-[calc(100vh-6.5rem)] flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-2xl transition-all sm:right-6 sm:left-auto sm:w-[360px] md:w-[370px] xl:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{EDA_CHATBOT_NAME}</h3>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span className="truncate max-w-[190px]">{currentPageLabel}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Restart conversation with Eddie"
                aria-label="Restart conversation with Eddie"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/60 text-foreground border border-border/50"
                    }`}
                  >
                    {message.content ? (
                      <FormattedMessage content={message.content} />
                    ) : (
                      <div className="flex items-center gap-1.5 py-1 text-xs text-muted-foreground">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quick Starter Question Chips (shown after first assistant message) */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Suggested Questions for this page:
                </p>
                <div className="flex flex-col gap-1.5">
                  {starterQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      className="text-left rounded-lg border border-border/70 bg-card px-2.5 py-1.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-muted/70 active:scale-[0.99]"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="border-t border-border bg-muted/20 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Eddie about this page, Python, or EDA..."
                disabled={isLoading}
                className="max-h-24 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs transition-opacity hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              Eddie reads live page context to explain concepts.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
