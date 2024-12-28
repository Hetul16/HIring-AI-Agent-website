// import React from 'react';
import { LogIn, FileText, Search } from 'lucide-react';

const steps = [
  {
    icon: LogIn,
    title: 'Create Account',
    description: 'Sign up and log in to your recruiter dashboard'
  },
  {
    icon: FileText,
    title: 'Define Requirements',
    description: 'Specify job role, time interval, and description'
  },
  {
    icon: Search,
    title: 'Get Results',
    description: 'Receive AI-matched candidates instantly'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-fade-in">
          How It Works
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center max-w-sm group animate-fade-slide-up"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                <step.icon className="w-8 h-8 text-white transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-purple-600">
                {step.title}
              </h3>
              <p className="text-gray-600 transition-all duration-300 group-hover:text-gray-900">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-purple-200">
                  <div 
                    className="h-full bg-purple-600 animate-progress-line" 
                    style={{
                      animationDelay: `${(index + 1) * 0.3}s`
                    }}
                  />
                </div>
              )}

              <div className="absolute -z-10 w-full h-full rounded-xl bg-purple-50 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}