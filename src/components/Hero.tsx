import React from 'react';
import { ThreeBackground } from './ThreeBackground';
import { AnimatedText } from './AnimatedText';
import { GlowingButton } from './GlowingButton';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          <div className="animate-fade-in">
            <span className="inline-block px-4 py-2 rounded-full text-pink-500 text-sm font-medium
              bg-pink-500/10 border border-pink-500/20">
              AI-Powered Recruitment
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold animate-gradient-x text-gradient">
            Your Smart AI Hiring Agent
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 animate-fade-in">
            Simplify Your Recruitment Journey with AI-Powered Solutions
          </p>
          
          <div className="animate-fade-in pt-8">
            <GlowingButton>
              Get Started
            </GlowingButton>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
        from-transparent via-pink-500/50 to-transparent" />
    </div>
  );
}