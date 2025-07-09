import React from 'react';

interface AdBannerProps {
  size: 'small' | 'medium' | 'large';
  position: 'header' | 'sidebar' | 'footer' | 'result';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ size, position, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-20 max-w-sm';
      case 'medium':
        return 'h-24 max-w-md';
      case 'large':
        return 'h-32 max-w-2xl';
      default:
        return 'h-24 max-w-md';
    }
  };

  const getPositionText = () => {
    switch (position) {
      case 'header':
        return 'Header Ad Space';
      case 'sidebar':
        return 'Sidebar Ad';
      case 'footer':
        return 'Footer Ad Space';
      case 'result':
        return 'Sponsored Content';
      default:
        return 'Advertisement';
    }
  };

  return (
    <div className={`${getSizeClasses()} w-full mx-auto ${className}`}>
      <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 text-sm font-medium">
        <div className="text-center">
          <div className="text-xs opacity-60 mb-1">Advertisement</div>
          <div>{getPositionText()}</div>
          <div className="text-xs opacity-60 mt-1">{size} • {position}</div>
        </div>
      </div>
    </div>
  );
};