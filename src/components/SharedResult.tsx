import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";
import { AdBanner } from "./AdBanner";
import { DecisionMode } from "../types";
import { getModeEmoji } from "../utils/decision";

interface SharedResultProps {
  result: string;
  mode: DecisionMode;
  onStartNew: () => void;
}

export const SharedResult: React.FC<SharedResultProps> = ({
  result,
  mode,
  onStartNew,
}) => {
  const [emoji, setEmoji] = useState("🎯");

  useEffect(() => {
    setEmoji(getModeEmoji(mode, result));

    // Trigger celebration confetti
    const timer = setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"],
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [result, mode]);

  const getShareTitle = () => {
    switch (mode) {
      case "coin":
        return "Your friend flipped a coin and got";
      case "dice":
        return "Your friend rolled a dice and got";
      case "wheel":
        return "Your friend spun the wheel and got";
      default:
        return "Your friend chose";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 text-center">
          <div className="text-5xl mb-6">
            <span className="inline-block animate-bounce">{emoji}</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {getShareTitle()}...
          </h1>

          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 animate-pulse">
            {result}
          </div>

          <div className="space-y-4">
            <button
              onClick={onStartNew}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Make Your Own Decision
            </button>

            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Shared via Decide For Me
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
