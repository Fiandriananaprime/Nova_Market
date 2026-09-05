import { Star } from 'lucide-react';

export function Rating({ value, count, showCount = true, size = 'sm' }: { value: number; count?: number; showCount?: boolean; size?: 'xs' | 'sm' | 'md' }) {
  const sizes = { xs: 'w-3 h-3', sm: 'w-3.5 h-3.5', md: 'w-4 h-4' };
  return (
    <div className="flex items-center gap-1">
      <Star className={`${sizes[size]} fill-amber-400 text-amber-400`} />
      <span className={`font-medium ${size === 'xs' ? 'text-xs' : 'text-sm'} text-foreground`}>{value.toFixed(1)}</span>
      {showCount && count !== undefined && <span className={`text-muted-foreground ${size === 'xs' ? 'text-xs' : 'text-sm'}`}>({count.toLocaleString()})</span>}
    </div>
  );
}
