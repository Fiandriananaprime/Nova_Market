import { CheckCircle2 } from 'lucide-react';

export function VerifiedBadge({ small }: { small?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[#0077B6] font-medium ${small ? 'text-xs' : 'text-sm'}`}>
      <CheckCircle2 className={small ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      Verified
    </span>
  );
}
