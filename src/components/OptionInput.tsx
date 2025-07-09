import React from 'react';
import { X } from 'lucide-react';

interface OptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  placeholder: string;
  canRemove: boolean;
  index: number;
}

export const OptionInput: React.FC<OptionInputProps> = ({
  value,
  onChange,
  onRemove,
  placeholder,
  canRemove,
  index
}) => {
  return (
    <div className="relative group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 bg-white/70 backdrop-blur-sm hover:border-gray-300"
        maxLength={50}
      />
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Remove option"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};