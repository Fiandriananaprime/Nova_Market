interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(current - 1)} disabled={current <= 1} className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-secondary transition-colors">Prev</button>
      {pages.map(p => (
        <button key={p} onClick={() => onChange(p)} className={`w-8 h-8 text-sm rounded-lg border transition-colors ${p === current ? 'bg-[#0077B6] text-white border-[#0077B6]' : 'border-border hover:bg-secondary'}`}>{p}</button>
      ))}
      <button onClick={() => onChange(current + 1)} disabled={current >= total} className="px-3 py-1.5 text-sm rounded-lg border border-border disabled:opacity-40 hover:bg-secondary transition-colors">Next</button>
    </div>
  );
}

