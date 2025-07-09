export interface Option {
  id: string;
  value: string;
}

export interface Decision {
  selectedOption: string;
  allOptions: string[];
  timestamp: number;
}

export type DecisionMode = 'normal' | 'coin' | 'dice' | 'wheel';

export interface ModeConfig {
  id: DecisionMode;
  name: string;
  emoji: string;
  description: string;
}