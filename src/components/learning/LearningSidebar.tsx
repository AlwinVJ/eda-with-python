import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Grid,
  ScatterChart,
  Search,
  ShieldCheck,
  Table,
} from "lucide-react";
import { useState } from "react";
import { getAllModules, getAllTopics } from "@/data/learning";
import type { LearningModule } from "@/data/learning/types";

interface LearningSidebarProps {
  currentTopicSlug?: string;
  onSelectTopic?: () => void;
}

const moduleIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search: Search,
  Table: Table,
  BarChart2: BarChart2,
  Grid: Grid,
  Scatter: ScatterChart,
  ShieldCheck: ShieldCheck,
};

export function LearningSidebar({ currentTopicSlug, onSelectTopic }: LearningSidebarProps) {
  const modules = getAllModules();
  const allTopics = getAllTopics();

  // Find module of current topic to expand by default
  const activeTopic = allTopics.find((t) => t.slug === currentTopicSlug);
  const activeModuleId = activeTopic?.moduleId || "foundations";

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeModuleId]: true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-border bg-card/50 p-4 lg:py-6 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="mb-5 pb-4 border-b border-border">
        <Link
          to="/learn"
          className="flex items-center gap-2 text-foreground font-bold text-base hover:text-primary transition-colors"
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span>EDA Curriculum</span>
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Dr. Howard Seltman (CMU) · 21 Lessons</p>
      </div>

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((mod: LearningModule) => {
          const isExpanded = expandedModules[mod.id] ?? false;
          const Icon = moduleIconMap[mod.iconName] || BookOpen;

          return (
            <div
              key={mod.id}
              className="rounded-lg border border-border/60 bg-background/50 overflow-hidden"
            >
              {/* Module Accordion Toggle */}
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="rounded-md bg-primary/10 p-1.5 text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Module {mod.order}
                    </div>
                    <div className="truncate text-xs sm:text-sm font-semibold text-foreground">
                      {mod.shortTitle}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                )}
              </button>

              {/* Module Topics */}
              {isExpanded && (
                <div className="border-t border-border/50 bg-muted/10 py-1 px-1.5 space-y-0.5">
                  {mod.topics.map((t) => {
                    const isActive = t.slug === currentTopicSlug;

                    return (
                      <Link
                        key={t.slug}
                        to="/learn/$topicId"
                        params={{ topicId: t.slug }}
                        onClick={onSelectTopic}
                        className={`flex items-start gap-2 rounded-md px-2.5 py-2 text-xs transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="font-mono text-[10px] opacity-75 shrink-0 mt-0.5">
                          {t.slug === currentTopicSlug ? "●" : "○"}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate">{t.title}</div>
                          <div
                            className={`flex items-center gap-1 text-[10px] mt-0.5 ${
                              isActive ? "text-primary-foreground/80" : "text-muted-foreground/70"
                            }`}
                          >
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{t.estimatedMinutes} min</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
