import React from 'react';
import { Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function DashboardPage() {
  const location = useLocation();
  const candidates = location.state?.candidates || [];


  console.log('Candidates in dashboard page========:', candidates);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Candidate Results</h1>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Results
          </button>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg backdrop-blur-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Skills</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Relevance</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {candidates.map((candidate: { name: string; skills?: string[]; relevance: string }, index: React.Key | null | undefined) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{candidate.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{candidate.skills ? candidate.skills.join(', ') : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{candidate.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}