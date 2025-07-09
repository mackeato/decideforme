import React, { useEffect, useState } from 'react';
import { RotateCcw, Share2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DecisionMode } from '../types';
import { getModeEmoji, createShareableUrl } from '../utils/decision';

interface DecisionResultProps {
  selectedOption: string;
  onTryAgain: () => void;
  isAnimating: boolean;
  mode: DecisionMode;
}

export const DecisionResult: React.FC<DecisionResultProps> = ({
  selectedOption,
  onTryAgain,
  isAnimating,
  mode
}) => {
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emoji, setEmoji] = useState('🎯');

  useEffect(() => {
    if (selectedOption && !isAnimating) {
      // Delay before showing result for suspense
      const timer = setTimeout(() => {
        setShowResult(true);
        setEmoji(getModeEmoji(mode, selectedOption));
        
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']
        });
        
        // Additional confetti burst
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 }
          });
        }, 200);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      setShowResult(false);
    }
  }, [selectedOption, isAnimating, mode]);

  const handleShare = async () => {
    const shareUrl = createShareableUrl(selectedOption, mode);
    const shareText = `I let Decide For Me choose: ${selectedOption}! ${emoji}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Decide For Me',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        // Fallback to copy
        handleCopy(shareUrl);
      }
    } else {
      handleCopy(shareUrl);
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (!selectedOption) return null;

  const getResultTitle = () => {
    switch (mode) {
      case 'coin':
        return 'The coin landed on...';
      case 'dice':
        return 'You rolled a...';
      case 'wheel':
        return 'The wheel chose...';
      default:
        return 'You should go with...';
    }
  };

  return (
    <div className="mt-8 text-center">
      <div className={`transition-all duration-1000 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        {!showResult && selectedOption && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-4">
              <span className="inline-block animate-spin">⏳</span>
            </div>
            <p className="text-xl text-gray-600">Making your decision...</p>
          </div>
        )}
        
        {showResult && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg animate-bounce-in">
            <div className="text-4xl mb-4">
              <span className="inline-block animate-bounce text-5xl">
                {emoji}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {getResultTitle()}
            </h3>
            
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 animate-pulse-scale">
              {selectedOption}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onTryAgain}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share Result
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleCopy(createShareableUrl(selectedOption, mode))}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Copy className="h-4 w-4" />
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};