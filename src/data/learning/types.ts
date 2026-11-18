export interface CodeSnippet {
  language: string;
  code: string;
  output?: string;
  explanation?: string;
}

export interface FormulaDefinition {
  title: string;
  displayFormula: string;
  variables: { symbol: string; meaning: string }[];
  intuition: string;
  exampleCalculation?: {
    given: string;
    steps: string[];
    result: string;
    interpretation: string;
  };
}

export interface KnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TopicSection {
  id: string;
  title: string;
  content?: string[];
  content_after?: string[];
  bullets?: string[];
  steps?: string[];
  table?: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  callout?: {
    type: "note" | "tip" | "warning" | "pdf-source";
    title?: string;
    message: string;
  };
  formula?: FormulaDefinition;
  code?: CodeSnippet;
  interpretation?: string[];
  mistakes?: string[];
}

export interface LearningTopic {
  id: string;
  slug: string;
  moduleId: string;
  order: number;
  globalOrder: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  summary: string;
  prerequisites: string[];
  sections: TopicSection[];
  quiz: KnowledgeCheck;
  takeaways: string[];
}

export interface LearningModule {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  iconName: "Search" | "Grid" | "BarChart2" | "Table" | "Scatter" | "ShieldCheck";
  pdfReference: string;
  topics: {
    slug: string;
    title: string;
    subtitle: string;
    summary: string;
    estimatedMinutes: number;
  }[];
}
