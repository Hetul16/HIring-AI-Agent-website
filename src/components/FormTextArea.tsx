import React from 'react';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function FormTextArea({ label, ...props }: FormTextAreaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        className="block w-full rounded-md bg-slate-700/50 border border-slate-600 focus:border-indigo-500 focus:ring-indigo-500 text-white px-3 py-2 text-sm placeholder-slate-400 min-h-[100px]"
      />
    </div>
  );
}