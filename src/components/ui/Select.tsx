import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <select
        className={`w-full bg-card border border-border text-foreground rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0077B6]/30 focus:border-[#0077B6] transition-all ${className}`}
        {...props}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
