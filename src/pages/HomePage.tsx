import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  );
}