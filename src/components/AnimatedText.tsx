import React from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="animate-slide-up"
        style={{ animationDelay: `${delay}ms` }}
      >
        {text}
      </div>
    </div>
  );
}