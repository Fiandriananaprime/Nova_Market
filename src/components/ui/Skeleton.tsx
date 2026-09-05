export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-border rounded animate-pulse ${className}`} />;
}
