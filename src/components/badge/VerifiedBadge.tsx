import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function VerifiedBadge({ small }: { small?: boolean }) {
    const { t } = useTranslation()
  return (
    <span className={`inline-flex items-center gap-0.5 text-primary font-medium ${small ? 'text-xs' : 'text-sm'}`}>
      <CheckCircle2 className={small ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {t("Verified")}
    </span>
  );
}
