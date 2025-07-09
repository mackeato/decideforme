import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        Decide For Me
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
        Can't decide? Let me pick for you! Enter your options and I'll make the choice.
      </p>
    </div>
  );
};