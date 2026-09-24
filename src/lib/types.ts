export interface Question {
  id: string;
  title: string;
  context?: string;
  options: {
    id: string;
    text: string;
    isRecommended?: boolean;
    points: number; // 0 ou 1
  }[];
  explanation: string;
}

export interface SimulationCase {
  id: string;
  headline: string;
  category: string;
  publishedAt: string;
  authorOrSource: string;
  bodyText: string;
  imagePromptOrDescription?: string;
  imageUrl?: string;
  actualType: "fake_ia" | "manipulado" | "verdadeiro";
  pareAnalysis: {
    p: string; // Pare
    a: string; // Analise a fonte
    r: string; // Rastreie evidências
    e: string; // Examine o contexto
  };
  verdictExplanation: string;
  redFlags: string[];
}

export interface DashboardMetrics {
  totalParticipants: number;
  avgPreScore: number;
  avgPostScore: number;
  evolutionAbsolute: number;
  improvementRatePercentage: number;
  preparedRatePercentage: number;
  odsAlignment: {
    code: number;
    title: string;
    relevance: string;
    description: string;
  }[];
  recentSubmissions: {
    name: string;
    preScore: number;
    postScore: number;
    evolution: number;
    date: string;
  }[];
}
