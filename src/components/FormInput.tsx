import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export function FormInput({ label, icon: Icon, ...props }: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        <input
          {...props}
          className={`block w-full rounded-md bg-slate-700/50 border border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-white ${
            Icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2 text-sm placeholder-slate-400`}
        />
      </div>
    </div>
  );
}