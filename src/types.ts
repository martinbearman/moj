export interface Event {
  id: string;
  timestamp: string;
  type: string;
  value: number;
}

export interface TypeSummary {
  count: number;
  aggregate: number;
}

export interface Summary {
  total: number;
  type: Record<string, TypeSummary>;
}
