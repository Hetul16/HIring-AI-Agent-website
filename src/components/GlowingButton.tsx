import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlowingButtonProps {
  children: React.ReactNode;
}

export function GlowingButton({ children }: GlowingButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/find-candidates')}
      className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600
        text-white font-bold text-lg transform hover:scale-105 transition-all duration-300
        hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-600 opacity-0 
        group-hover:opacity-20 transition-opacity duration-300" />
      <div className="relative flex items-center space-x-2">
        {children}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </button>
  );
}