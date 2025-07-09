import React, { useState } from 'react';
import { Plus, Shuffle } from 'lucide-react';
import { OptionInput } from './OptionInput';
import { AdBanner } from './AdBanner';
import { generateId } from '../utils/decision';
import { Option } from '../types';

interface DecisionFormProps {
  onDecide: (options: string[]) => void;
  isLoading: boolean;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ onDecide, isLoading }) => {
  const [options, setOptions] = useState<Option[]>([
    { id: generateId(), value: '' },
    { id: generateId(), value: '' }
  ]);

  const handleOptionChange = (id: string, value: string) => {
    setOptions(prev => prev.map(option => 
      option.id === id ? { ...option, value } : option
    ));
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions(prev => [...prev, { id: generateId(), value: '' }]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(prev => prev.filter(option => option.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const optionValues = options.map(option => option.value.trim()).filter(Boolean);
    
    if (optionValues.length >= 2) {
      onDecide(optionValues);
    }
  };

  const validOptions = options.filter(option => option.value.trim() !== '').length;
  const canSubmit = validOptions >= 2;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        {options.map((option, index) => (
          <OptionInput
            key={option.id}
            value={option.value}
            onChange={(value) => handleOptionChange(option.id, value)}
            onRemove={() => removeOption(option.id)}
            placeholder={`Option ${index + 1}`}
            canRemove={options.length > 2}
            index={index}
          />
        ))}
      </div>

      {options.length < 5 && (
        <button
          type="button"
          onClick={addOption}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add another option
        </button>
      )}

      {/* Contextual ad placement - only shows when user has 3+ options */}
      {validOptions >= 3 && (
        <div className="py-2">
          <AdBanner size="small" position="sidebar" className="opacity-70" />
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={!canSubmit || isLoading}
          className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            canSubmit && !isLoading
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Deciding...
            </>
          ) : (
            <>
              <Shuffle className="h-5 w-5" />
              Decide For Me!
            </>
          )}
        </button>
      </div>

      {validOptions < 2 && (
        <p className="text-sm text-gray-500 text-center">
          Enter at least 2 options to make a decision
        </p>
      )}
    </form>
  );
};