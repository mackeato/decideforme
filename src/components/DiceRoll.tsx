import React from 'react';

interface DiceRollProps {
  onDecide: () => void;
  isLoading: boolean;
}

export const DiceRoll: React.FC<DiceRollProps> = ({ onDecide, isLoading }) => {
  return (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8">
        <div className="text-6xl mb-4">
          <span className={`inline-block transition-transform duration-500 ${isLoading ? 'animate-bounce' : ''}`}>
            🎲
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          Roll the dice and see what number comes up!
        </p>
        <button
          onClick={onDecide}
          disabled={isLoading}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            !isLoading
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
              Rolling...
            </>
          ) : (
            'Roll Dice!'
          )}
        </button>
      </div>
    </div>
  );
};