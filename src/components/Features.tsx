import React from 'react';
import { Brain, Users, Filter, Clock } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Resume Matching',
    description: 'Advanced algorithms match the perfect candidates with your job requirements',
  },
  {
    icon: Users,
    title: 'Customizable Roles',
    description: 'Define custom roles and requirements for precise candidate matching',
  },
  {
    icon: Filter,
    title: 'Top-K Candidate Filtering',
    description: 'Automatically rank and filter the best candidates for your positions',
  },
  {
    icon: Clock,
    title: 'Time-Saving Automation',
    description: 'Reduce hiring time by up to 75% with automated screening',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group w-90 h-80 bg-white rounded-xl shadow-lg hover:shadow-xl 
              transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
