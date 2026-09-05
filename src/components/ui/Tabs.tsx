interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 border-b border-border">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${active === tab.id ? 'border-[#0077B6] text-[#0077B6]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${active === tab.id ? 'bg-[#0077B6]/10 text-[#0077B6]' : 'bg-secondary text-muted-foreground'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
