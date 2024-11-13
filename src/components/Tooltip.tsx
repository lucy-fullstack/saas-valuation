import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      
      {isVisible && (
        <div 
          className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm 
                    top-0 left-1/2 transform -translate-x-1/2 -translate-y-full
                    whitespace-normal break-words min-w-[200px] max-w-xs
                    after:content-[''] after:absolute after:left-1/2 after:-bottom-2
                    after:w-4 after:h-4 after:bg-transparent"
        >
          <div className="relative z-20">
            {content}
            <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -translate-x-1/2 left-1/2 -bottom-1"></div>
          </div>
        </div>
      )}
    </div>
  );
}