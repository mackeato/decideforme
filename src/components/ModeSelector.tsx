import React from 'react';
import { DecisionMode, ModeConfig } from '../types';

interface ModeSelectorProps {
  currentMode: DecisionMode;
  onModeChange: (mode: DecisionMode) => void;
}

const modes: ModeConfig[] = [
  {
    id: 'normal',
    name: 'Decision',
    emoji: '🎯',
    description: 'Choose from your options'
  },
  {
    id: 'coin',
    name: 'Coin Flip',
    emoji: '🪙',
    description: 'Heads or Tails'
  },
  {
    id: 'dice',
    name: 'Dice Roll',
    emoji: '🎲',
    description: 'Roll 1-6'
  },
  {
    id: 'wheel',
    name: 'Lucky Wheel',
    emoji: '🎡',
    description: 'Spin for luck'
  }
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-600 mb-3 text-center">Choose your decision mode</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              currentMode === mode.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white/70 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
            }`}
          >
            <span className="text-base">{mode.emoji}</span>
            <span>{mode.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};