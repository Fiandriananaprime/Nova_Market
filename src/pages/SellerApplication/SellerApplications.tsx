import { useEffect, useState } from 'react';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { Button, StatusBadge, Badge } from '../../components/ui';
import { getSellerApplications } from '@/api/admin/sellerApplication';
import type { SellerApplication } from '@/type/admin/seller';
import { Link } from 'react-router';
import { useToast } from '@/contexts/ToastContext';
import { getApiErrorMessage } from '@/api/errorMessage';
import { useTranslation } from 'react-i18next';

export default function SellerApplications() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [apps, setApps] = useState<SellerApplication[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getSellerApplications({ page: 1, limit: 50, status: 'pending' })
      .then(({ data }) => setApps(data))
      .catch((error) => toast(getApiErrorMessage(error, 'Unable to load seller applications.'), 'error'))
      .finally(() => setLoading(false));
  }, []);



  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold font-display text-secondary-foreground">{t("Seller-Applications-Demandes-de-vendeurs")}</h1>
        <Badge variant="warning">{apps.filter(a => a.status === 'pending').length} {t("pending")}</Badge>
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground">{t("Loading applications...")}</div>
      ) : (
      <div className="grid gap-4">
        {apps.map(app => (
          <div key={app.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                {app.businessName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold font-display text-secondary-foreground">{app.businessName}</h3>
                    <div className="text-sm text-muted-foreground">{app.owner}</div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                  {[
                    { label: 'Email', value: app.email },
                    { label: 'Phone', value: app.phone },
                    { label: 'Location', value: app.location },
                    { label: 'Category', value: app.category },
                  ].map(f => (
                    <div key={f.label}>
                      <div className="text-xs text-muted-foreground">{f.label}</div>
                      <div className="font-medium text-secondary-foreground truncate">{f.value}</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mb-3">Applied: {app.date}</div>
                {app.status === 'pending' && (
                  <div className="flex gap-2">
                    <Link to={`/admin/sellers/applications/${app.id}`}>
                      <Button variant="primary" size="sm" className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <MessageSquare className="w-3.5 h-3.5" />
                        {t("Request info")}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
