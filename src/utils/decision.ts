import { DecisionMode } from '../types';

export const generateRandomDecision = (options: string[]): string => {
  const validOptions = options.filter(option => option.trim() !== '');
  
  if (validOptions.length < 2) {
    throw new Error('Need at least 2 options to make a decision');
  }
  
  const randomIndex = Math.floor(Math.random() * validOptions.length);
  return validOptions[randomIndex];
};

export const generateModeDecision = (mode: DecisionMode): string => {
  switch (mode) {
    case 'coin':
      return Math.random() < 0.5 ? 'Heads' : 'Tails';
    case 'dice':
      return (Math.floor(Math.random() * 6) + 1).toString();
    case 'wheel':
      const wheelOptions = ['🎯', '🌟', '🎊', '✨', '🎉', '🎪', '🎭', '🎨'];
      return wheelOptions[Math.floor(Math.random() * wheelOptions.length)];
    default:
      throw new Error('Invalid mode');
  }
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getRandomEmoji = (): string => {
  const emojis = ['🎯', '✨', '🎉', '🌟', '🎊', '🎪', '🎭', '🎨', '🎮', '🎲'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const getModeEmoji = (mode: DecisionMode, result?: string): string => {
  switch (mode) {
    case 'coin':
      return result === 'Heads' ? '🪙' : '🪙';
    case 'dice':
      const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      return result ? diceEmojis[parseInt(result) - 1] : '🎲';
    case 'wheel':
      return result || '🎡';
    default:
      return getRandomEmoji();
  }
};

export const createShareableUrl = (result: string, mode: DecisionMode = 'normal'): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  params.set('result', result);
  if (mode !== 'normal') {
    params.set('mode', mode);
  }
  return `${baseUrl}?${params.toString()}`;
};

export const parseUrlParams = (): { result: string | null; mode: DecisionMode } => {
  const params = new URLSearchParams(window.location.search);
  const result = params.get('result');
  const mode = (params.get('mode') as DecisionMode) || 'normal';
  return { result, mode };
};