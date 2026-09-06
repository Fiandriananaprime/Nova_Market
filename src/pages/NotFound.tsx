import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface NotFoundProps {
  prop: string;
}

export const aboutNotFound = ({ prop }: NotFoundProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="text-6xl font-bold font-display text-border mb-3">
        404
      </div>

      <h2 className="text-2xl font-bold font-display text-foreground mb-2">
        {t(`${prop} not found`)}
      </h2>

      <p className="text-muted-foreground mb-5">
        {t(`The ${prop} you're looking for doesn't exist.`)}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="text-[#0077B6] hover:underline font-medium"
      >
        ← {t('Go Back')}
      </button>
    </div>
  );
};

export default aboutNotFound;