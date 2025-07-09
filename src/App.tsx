import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { AdBanner } from "./components/AdBanner";
import { ModeSelector } from "./components/ModeSelector";
import { DecisionForm } from "./components/DecisionForm";
import { CoinFlip } from "./components/CoinFlip";
import { DiceRoll } from "./components/DiceRoll";
import { LuckyWheel } from "./components/LuckyWheel";
import { DecisionResult } from "./components/DecisionResult";
import { SharedResult } from "./components/SharedResult";
import {
  generateRandomDecision,
  generateModeDecision,
  parseUrlParams,
} from "./utils/decision";
import { DecisionMode } from "./types";

function App() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState<DecisionMode>("normal");
  const [isSharedResult, setIsSharedResult] = useState(false);

  useEffect(() => {
    const { result, mode: urlMode } = parseUrlParams();
    if (result) {
      setSelectedOption(result);
      setMode(urlMode);
      setIsSharedResult(true);
    }
  }, []);

  const handleDecide = async (options?: string[]) => {
    setIsLoading(true);
    setIsAnimating(true);

    // Add suspense delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      let decision: string;
      if (mode === "normal" && options) {
        decision = generateRandomDecision(options);
      } else {
        decision = generateModeDecision(mode);
      }

      setSelectedOption(decision);

      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set("result", decision);
      if (mode !== "normal") {
        url.searchParams.set("mode", mode);
      } else {
        url.searchParams.delete("mode");
      }
      window.history.replaceState({}, "", url.toString());
    } catch (error) {
      console.error("Error making decision:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 100);
    }
  };

  const handleTryAgain = () => {
    setSelectedOption("");
    setIsAnimating(false);
    setIsSharedResult(false);

    // Clear URL params
    const url = new URL(window.location.href);
    url.searchParams.delete("result");
    url.searchParams.delete("mode");
    window.history.replaceState({}, "", url.toString());
  };

  const handleModeChange = (newMode: DecisionMode) => {
    setMode(newMode);
    handleTryAgain(); // Reset state when changing modes
  };

  const handleStartNew = () => {
    setIsSharedResult(false);
    handleTryAgain();
  };

  if (isSharedResult) {
    return (
      <SharedResult
        result={selectedOption}
        mode={mode}
        onStartNew={handleStartNew}
      />
    );
  }

  const renderModeComponent = () => {
    switch (mode) {
      case "coin":
        return (
          <CoinFlip onDecide={() => handleDecide()} isLoading={isLoading} />
        );
      case "dice":
        return (
          <DiceRoll onDecide={() => handleDecide()} isLoading={isLoading} />
        );
      case "wheel":
        return (
          <LuckyWheel onDecide={() => handleDecide()} isLoading={isLoading} />
        );
      default:
        return <DecisionForm onDecide={handleDecide} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header />

        {/* Header Ad Banner - Natural placement after hero */}
        <div className="mb-8">
          <AdBanner size="medium" position="header" />
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
          <ModeSelector currentMode={mode} onModeChange={handleModeChange} />

          <div
            className={`transition-all duration-500 ${
              isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {renderModeComponent()}
          </div>

          <DecisionResult
            selectedOption={selectedOption}
            onTryAgain={handleTryAgain}
            isAnimating={isAnimating}
            mode={mode}
          />
        </div>

        {/* Result Ad Banner - Shows after decision is made */}
        {selectedOption && !isAnimating && (
          <div className="mt-6">
            <AdBanner size="small" position="result" className="opacity-80" />
          </div>
        )}

        <footer className="text-center mt-8 text-gray-500 text-sm">
          {/* Footer Ad Banner - Subtle placement above footer */}
          <div className="mb-6">
            <AdBanner size="large" position="footer" />
          </div>
          <p>
            Built
            <a href="#" className="hover:text-gray-700 transition-colors">
              by
            </a>{" "}
            •{" "}
            <a href="#" className="hover:text-gray-700 transition-colors">
              Mackeato
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
