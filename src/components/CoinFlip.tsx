import React from 'react';

interface CoinFlipProps {
  onDecide: () => void;
  isLoading: boolean;
}

export const CoinFlip: React.FC<CoinFlipProps> = ({ onDecide, isLoading }) => {
  return (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8">
        <div className="text-6xl mb-4">
          <span className={`inline-block transition-transform duration-500 ${isLoading ? 'animate-spin' : ''}`}>
            🪙
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          Let fate decide with a classic coin flip!
        </p>
        <button
          onClick={onDecide}
          disabled={isLoading}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            !isLoading
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
              Flipping...
            </>
          ) : (
            'Flip Coin!'
          )}
        </button>
      </div>
    </div>
  );
};