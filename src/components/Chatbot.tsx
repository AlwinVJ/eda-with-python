import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
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
  Maximize2,
  Minimize2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import {
  ONETAG_KEY,
  isPlaceholderKey,
  EDA_CHATBOT_NAME,
  EDA_CHATBOT_WELCOME_MESSAGE,
  getPageContext,
  buildSystemPrompt,
  generateContextualResponse,
  type PageContextInfo,
} from "@/lib/onetag";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

/**
 * Parses markdown inline formatting: **bold**, `code`, [text](url), *italic*
 */
function renderInlineFormatted(text: string) {
  // Regex to split by markdown links [text](url), inline `code`, and **bold**
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const tokens = text.split(tokenRegex);

  return tokens.map((token, idx) => {
    // Markdown links: [label](url)
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const isInternal = url.startsWith("/") && !url.startsWith("//");

      if (isInternal) {
        return (
          <Link
            key={idx}
            to={url}
            className="inline-flex items-center gap-0.5 text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            <span>{label}</span>
            <ArrowRight className="h-3 w-3 inline" />
          </Link>
        );
      }

      return (
        <a
          key={idx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors"
        >
          <span>{label}</span>
          <ExternalLink className="h-3 w-3 inline" />
        </a>
      );
    }

    // Inline code: `code`
    if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      return (
        <code
          key={idx}
          className="rounded bg-muted/80 border border-border/50 px-1 py-0.5 font-mono text-[11px] font-semibold text-primary"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    // Bold text: **bold**
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={idx} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Italic text: *italic*
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={idx} className="italic text-foreground/90">
          {token.slice(1, -1)}
        </em>
      );
    }

    return token;
  });
}

/**
 * Helper to render structured markdown-like text with code blocks, copy buttons, headers, and lists.
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
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
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
                <span className="font-mono">{language || "python"}</span>
                <button
                  type="button"
                  onClick={() => copyCode(code.trim(), index)}
                  className="inline-flex items-center gap-1 text-xs transition-colors hover:text-foreground"
                  aria-label="Copy code"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto p-3 text-xs font-mono leading-normal text-foreground">
                <code>{code.trim()}</code>
              </pre>
            </div>
          );
        }

        // Render plain text paragraphs, converting ### headers, bullets, and inline markdown
        return (
          <div key={index} className="space-y-1.5">
            {part
              .split("\n\n")
              .filter(Boolean)
              .map((paragraph, pIdx) => {
                const trimmed = paragraph.trim();

                // Headers ###
                if (trimmed.startsWith("### ")) {
                  return (
                    <h4
                      key={pIdx}
                      className="mt-2.5 text-xs font-bold uppercase tracking-wider text-primary border-b border-border/40 pb-0.5"
                    >
                      {renderInlineFormatted(trimmed.replace("### ", ""))}
                    </h4>
                  );
                }

                // Bullets list
                const lines = trimmed.split("\n");
                const isBulletList = lines.every(
                  (l) =>
                    l.trim().startsWith("•") ||
                    l.trim().startsWith("- ") ||
                    l.trim().startsWith("✓ ") ||
                    l.trim().startsWith("✕ ") ||
                    /^\d+\.\s/.test(l.trim()),
                );

                if (isBulletList && lines.length > 1) {
                  return (
                    <ul key={pIdx} className="space-y-1 my-1 pl-1">
                      {lines.map((line, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-1.5 text-foreground/90">
                          <span className="text-primary font-bold shrink-0 mt-0.5">
                            {line.trim().startsWith("✓")
                              ? "✓"
                              : line.trim().startsWith("✕")
                                ? "✕"
                                : "•"}
                          </span>
                          <span className="leading-relaxed">
                            {renderInlineFormatted(line.replace(/^([•\-✓✕]|\d+\.)\s*/, "").trim())}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={pIdx} className="leading-relaxed text-foreground/90">
                    {renderInlineFormatted(trimmed)}
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentPageContext: PageContextInfo = getPageContext(pathname);

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
  const isSubmittingRef = useRef(false);
  const lastPathnameRef = useRef(pathname);

  const starterQuestions = currentPageContext.starterQuestions;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsMaximized(false);
  }, []);

  // Listen to client-side route changes and smoothly update context
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      const newCtx = getPageContext(pathname);
      lastPathnameRef.current = pathname;

      setMessages((prev) => {
        // If user hasn't started an active dialogue, simply update the welcome message
        if (prev.length <= 1) {
          return [
            {
              id: `welcome-${Date.now()}`,
              role: "assistant",
              content: `Hey! I'm Eddie. You're viewing **${newCtx.pageTitle}**.\nAsk me anything about this page, its findings, or technical concepts!`,
              timestamp: new Date(),
            },
          ];
        }

        // Avoid duplicate consecutive navigation notices
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.id.startsWith("nav-")) {
          return prev.slice(0, -1).concat({
            id: `nav-${Date.now()}`,
            role: "assistant",
            content: `📍 **Navigated to: ${newCtx.pageTitle}**\nI've updated my knowledge context to this page. Ask me anything about ${newCtx.shortLabel}!`,
            timestamp: new Date(),
          });
        }

        // Add clear navigation transition notice to preserve history while isolating page context
        return [
          ...prev,
          {
            id: `nav-${Date.now()}`,
            role: "assistant",
            content: `📍 **Navigated to: ${newCtx.pageTitle}**\nI've updated my knowledge context to this page. Ask me anything about ${newCtx.shortLabel}!`,
            timestamp: new Date(),
          },
        ];
      });
    }
  }, [pathname]);

  // Lock background scroll when maximized
  useEffect(() => {
    if (isOpen && isMaximized) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, isMaximized]);

  // Global Escape key listener: restores compact mode if maximized, otherwise closes
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, isMaximized, handleClose]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMaximized, messages, scrollToBottom]);

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: `Hey! I'm Eddie, your assistant for **${currentPageContext.pageTitle}**.\nAsk me anything about this page, dataset, Python code, or statistics!`,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async (userPrompt?: string) => {
    const query = (userPrompt || input).trim();
    if (!query || isLoading || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

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

    // Snapshot the active page context at query time
    const activeContext = getPageContext(pathname);

    try {
      // Check if OneTag AI SDK is loaded on window and has a live valid key
      if (typeof window !== "undefined" && window.onetag && !isPlaceholderKey(ONETAG_KEY)) {
        let accumulatedText = "";

        // Format history (excluding welcome & nav announcements)
        const history = messages
          .filter(
            (m) =>
              !m.id.startsWith("welcome") && !m.id.startsWith("nav") && m.id !== "initial-welcome",
          )
          .slice(-6)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const result = await window.onetag.ask(query, activeContext.fullTextContext, {
          system: buildSystemPrompt(activeContext),
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
        // High-Quality Grounded Contextual Responder
        await new Promise((resolve) => setTimeout(resolve, 200));
        const educationalResponse = generateContextualResponse(query, activeContext);

        // Smooth streaming animation for local answers
        const words = educationalResponse.split(" ");
        let streamed = "";
        for (let i = 0; i < words.length; i++) {
          streamed += (i > 0 ? " " : "") + words[i];
          if (i % 5 === 0 || i === words.length - 1) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMsgId ? { ...msg, content: streamed, isStreaming: true } : msg,
              ),
            );
            await new Promise((resolve) => setTimeout(resolve, 15));
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
      console.warn("OneTag AI invocation failed, using grounded fallback:", err);
      const fallback = generateContextualResponse(query, activeContext);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId ? { ...msg, content: fallback, isStreaming: false } : msg,
        ),
      );
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chatbot Launcher Button */}
      <button
        id="chatbot-launcher"
        type="button"
        onClick={() => {
          if (isOpen) {
            handleClose();
          } else {
            setIsOpen(true);
            setIsMaximized(false);
          }
        }}
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

      {/* Backdrop for compact mode on mobile & tablet */}
      {isOpen && !isMaximized && (
        <div
          className="fixed inset-0 z-40 bg-background/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Full Backdrop for maximized mode across all screens */}
      {isOpen && isMaximized && (
        <div
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
          onClick={() => setIsMaximized(false)}
          aria-hidden="true"
        />
      )}

      {/* Floating Chatbot Modal / Panel */}
      {isOpen && (
        <section
          id="chatbot-panel"
          aria-label="Eddie - EDA Learning Assistant"
          className={cn(
            "fixed z-50 flex flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-2xl chatbot-panel",
            isMaximized ? "chatbot-maximized" : "chatbot-compact",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{EDA_CHATBOT_NAME}</h3>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate">
                  <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                  <span className="truncate max-w-[200px] font-medium text-foreground/80">
                    {currentPageContext.shortLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                title="Restart conversation with Eddie"
                aria-label="Restart conversation with Eddie"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Restore compact window (Esc)" : "Maximize chat window"}
                aria-label={isMaximized ? "Restore compact window" : "Maximize chat window"}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                {isMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                title="Close chat"
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const isNavNotice = message.id.startsWith("nav-");

              if (isNavNotice) {
                return (
                  <div
                    key={message.id}
                    className="flex items-center justify-center my-2 text-center"
                  >
                    <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-muted-foreground max-w-md">
                      <FormattedMessage content={message.content} />
                    </div>
                  </div>
                );
              }

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
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-xs",
                      isMaximized && "sm:max-w-2xl xl:max-w-3xl",
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/60 text-foreground border border-border/50",
                    )}
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

            {/* Quick Starter Question Chips */}
            {messages.length <= 2 && starterQuestions.length > 0 && (
              <div className="pt-2">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Suggested Questions for {currentPageContext.shortLabel}:
                </p>
                <div
                  className={cn("flex flex-col gap-1.5", isMaximized && "sm:grid sm:grid-cols-2")}
                >
                  {starterQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSendMessage(q)}
                      className="text-left rounded-lg border border-border/70 bg-card px-2.5 py-1.5 text-xs text-foreground transition-all hover:border-primary/50 hover:bg-muted/70 active:scale-[0.99] disabled:opacity-50"
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
          <div className="border-t border-border bg-muted/20 p-3 shrink-0">
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
                placeholder={`Ask Eddie about ${currentPageContext.shortLabel}...`}
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
              Eddie uses live page context from{" "}
              <strong className="text-foreground">{currentPageContext.shortLabel}</strong>.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
