export interface ProjectItem {
  id: string;
  name: string;
  repoName: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'database' | 'ai-gateway' | 'kernel' | 'gpu-vector' | 'gpu-virtualization' | 'toolkit' | 'security' | 'edge' | 'llm-inference' | 'driver';
  categoryLabel: string;
  tagline: string;
  description: string;
  architectureDetails: string;
  keyFeatures: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
    unit?: string;
    badge?: string;
  }[];
  model3DType: 'strikedb' | 'chimera' | 'mips' | 'vugva' | 'polyglot' | 'opusedge' | 'rtl8188fu';
  accentColor: string;
  badgeText?: string;
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface PaperItem {
  id: string;
  title: string;
  doi: string;
  zenodoRecordId: string;
  zenodoUrl: string;
  authors: string[];
  date: string;
  publicationType: string;
  abstract: string;
  topics: string[];
  bibtex: string;
  highlights: string[];
}

export interface BenchmarkData {
  id: string;
  title: string;
  subtitle: string;
  furyLabel: string;
  furyValue: number;
  comp1Label: string;
  comp1Value: number;
  comp2Label: string;
  comp2Value: number;
  unit: string;
  higherIsBetter: boolean;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
