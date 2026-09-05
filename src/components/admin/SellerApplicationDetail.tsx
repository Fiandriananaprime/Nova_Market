import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { getSellerApplicationById, updateSellerApplicationStatus,
} from '@/api/admin/sellerApplication';
import { getApiErrorMessage } from '@/api/errorMessage';
import { useToast } from '@/contexts/ToastContext';
import { useApp } from '@/contexts/AppContext';
import { formatDate } from '@/hook/format';
import type { SellerApplication, SellerApplicationStatus} from '@/type/admin/seller';



const SellerApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useApp();

  const [application, setApplication] =
    useState<SellerApplication | null>(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const [decision, setDecision] = useState<'approve' | 'reject' | null>(
    null
  );

  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const data = await getSellerApplicationById(id);

        setApplication(data);
      } catch (error) {
        console.error(
          'Failed to fetch seller application:',
          error
        );
        toast(getApiErrorMessage(error, 'Unable to load this seller application.'), 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleDecision = async () => {
    if (!application || !id || !decision) return;

    if (decision === 'reject' && !reason.trim()) {
      return;
    }

    try {
      setActionLoading(true);
      setActionError(null);

      const updatedApplication =
        await updateSellerApplicationStatus(id, {
          action: decision,
          reason: reason.trim() || undefined,
        });

      setApplication(updatedApplication);
      setDecision(null);
      setReason('');
      toast(`Application ${decision === 'approve' ? 'approved' : 'rejected'} successfully.`);
    } catch (error) {
      console.error('Failed to update seller application:', error);
      const message = getApiErrorMessage(error, 'Unable to update this seller application. Please try again.');
      setActionError(message);
      toast(message, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-[var(--muted-foreground)]">
          Loading application...
        </p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 text-center">
          <p className="text-[var(--foreground)] font-medium">
            {t('Seller application not found', 'Demande de vendeur non trouvée')}
          </p>

          <Button
            className="mt-4"
            variant="outline"
            onClick={() =>
              navigate('/admin/sellers/applications')
            }
          >
            {t('Back to applications', 'Retour aux demandes')}
          </Button>
        </div>
      </div>
    );
  }

  const isPending = application.status === 'pending';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            to="/admin/sellers/applications"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('Back to applications', 'Retour aux demandes')}
          </Link>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold font-display text-[var(--foreground)]">
              {t('Seller Application', 'Demande de vendeur')}
            </h1>

            <StatusBadge status={application.status} />
          </div>

          <p className="text-sm text-[var(--muted-foreground)] mt-1">
            Application #{application.id}
          </p>
        </div>

        {isPending && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setDecision('reject')}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              {t('Reject', 'Rejeter')}
            </Button>

            <Button
              variant="accent"
              onClick={() => setDecision('approve')}
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {t('Approve', 'Approuver')}
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main information */}
        <div className="xl:col-span-2 space-y-6">
          {/* Business */}
          <Section
            title="Business information"
            description="Information provided by the seller"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-[var(--secondary)] flex items-center justify-center">
                <Building2 className="w-7 h-7 text-[#0077B6]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  {application.businessName}
                </h2>

                <p className="text-sm text-[var(--muted-foreground)]">
                  {application.category}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={<User />}
                label={t('Owner', 'Propriétaire')}
                value={application.owner}
              />

              <InfoItem
                icon={<Building2 />}
                label={t('Business name', 'Nom de l’entreprise')}
                value={application.businessName}
              />

              <InfoItem
                icon={<Mail />}
                label="Email"
                value={application.email}
              />

              <InfoItem
                icon={<Phone />}
                label={t('Phone', 'Téléphone')}
                value={application.phone}
              />

              <InfoItem
                icon={<MapPin />}
                label={t('Location', 'Emplacement')}
                value={application.location}
              />

              <InfoItem
                icon={<Building2 />}
                label={t('Category', 'Catégorie')}
                value={application.category}
              />
            </div>
          </Section>

          {/* Application information */}
          <Section
            title={t('Application information', 'Informations sur la demande')}
            description={t('Details about this seller application', 'Détails sur cette demande de vendeur')}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={<Calendar />}
                label={t('Application date', 'Date de la demande')}
                value={formatDate(application.date)}
              />

              <InfoItem
                icon={<Check />}
                label={t('Status', 'Statut')}
                value={getStatusLabel(application.status)}
              />

              <InfoItem
                icon={<User />}
                label={t('Applicant', 'Candidat')}
                value={application.owner}
              />

              <InfoItem
                icon={<Building2 />}
                label={t('Business', 'Entreprise')}
                value={application.businessName}
              />
            </div>
          </Section>
        </div>

        {/* Review */}
        <div>
          {isPending ? (
            <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden sticky top-6">
              <div className="px-6 py-5 border-b border-[var(--border)]">
                <h2 className="font-semibold text-[var(--foreground)]">
                  {t('Review application', 'Revoir la demande')}
                </h2>

                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  {t('Decide whether to approve or reject this seller.', 'Décider si vous souhaitez approuver ou rejeter ce vendeur.')}
                </p>
              </div>

              <div className="p-6 space-y-5">
                {actionError && (
                  <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {actionError}
                  </p>
                )}

                {/* Decision */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDecision('approve')}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      decision === 'approve'
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-[var(--border)] hover:bg-[var(--secondary)]'
                    }`}
                  >
                    <Check
                      className={`w-5 h-5 mb-3 ${
                        decision === 'approve'
                          ? 'text-green-600'
                          : 'text-[var(--muted-foreground)]'
                      }`}
                    />

                    <p className="font-medium text-sm text-[var(--foreground)]">
                      {t('Approve', 'Approuver')}
                    </p>

                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      {t('Accept seller', 'Accepter le vendeur')}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDecision('reject')}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      decision === 'reject'
                        ? 'border-red-500 bg-red-500/10'
                        : 'border-[var(--border)] hover:bg-[var(--secondary)]'
                    }`}
                  >
                    <X
                      className={`w-5 h-5 mb-3 ${
                        decision === 'reject'
                          ? 'text-red-600'
                          : 'text-[var(--muted-foreground)]'
                      }`}
                    />

                    <p className="font-medium text-sm text-[var(--foreground)]">
                      {t('Reject', 'Rejeter')}
                    </p>

                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      {t('Decline seller', 'Refuser le vendeur')}
                    </p>
                  </button>
                </div>

                {/* Reason */}
                {decision && (
                  <div>
                    <label
                      htmlFor="reason"
                      className="block text-sm font-medium text-[var(--foreground)] mb-2"
                    >
                      {t('Reason', 'Raison')}
                      {decision === 'reject' ? (
                        <span className="text-red-500 ml-1">*</span>
                      ) : (
                        <span className="text-xs font-normal text-[var(--muted-foreground)] ml-2">
                          {t('Optional', 'Facultatif')}
                        </span>
                      )}
                    </label>

                    <textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={6}
                      placeholder={
                        decision === 'reject'
                          ? t('Explain why this application is being rejected...', 'Expliquez pourquoi cette demande est en cours de rejet...')
                          : t('Add an optional note...', 'Ajoutez un commentaire facultatif...')
                      }
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] resize-none focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30"
                    />

                    {decision === 'reject' && (
                      <p className="text-xs text-[var(--muted-foreground)] mt-2">
                        {t('A reason is required when rejecting an application.', 'Une raison est requise lorsqu\'on rejette une demande.')}
                      </p>
                    )}
                  </div>
                )}

                {/* Action */}
                {decision && (
                  <Button
                    type="button"
                    variant={
                      decision === 'approve'
                        ? 'accent'
                        : 'danger'
                    }
                    disabled={
                      actionLoading ||
                      (decision === 'reject' && !reason.trim())
                    }
                    onClick={handleDecision}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {decision === 'approve' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}

                    {actionLoading
                      ? t('Processing...', 'Traitement en cours...')
                      : decision === 'approve'
                        ? t('Approve application', 'Approuver la demande')
                        : t('Reject application', 'Rejeter la demande')}
                  </Button>
                )}

                {!decision && (
                  <p className="text-xs text-center text-[var(--muted-foreground)]">
                    {t('Select a decision to continue.', 'Sélectionnez une décision pour continuer.')}
                  </p>
                )}
              </div>
            </section>
          ) : (
            <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
              <div className="flex items-center gap-3">
                <StatusBadge status={application.status} />

                <div>
                  <p className="font-medium text-[var(--foreground)]">
                    {t('Application reviewed', 'Demande examinée')}
                  </p>

                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {t('This application is no longer pending.', 'Cette demande n\'est plus en attente.')}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
    <div className="px-6 py-5 border-b border-[var(--border)]">
      <h2 className="font-semibold text-[var(--foreground)]">
        {title}
      </h2>

      {description && (
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          {description}
        </p>
      )}
    </div>

    <div className="p-6">{children}</div>
  </section>
);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 text-[var(--muted-foreground)] [&>svg]:w-4 [&>svg]:h-4">
      {icon}
    </div>

    <div>
      <p className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">
        {label}
      </p>

      <p className="text-sm font-medium text-[var(--foreground)] mt-1">
        {value}
      </p>
    </div>
  </div>
);

const StatusBadge = ({
  status,
}: {
  status: SellerApplicationStatus;
}) => {
  const styles = {
    pending:
      'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    approved:
      'bg-green-500/10 text-green-600 border-green-500/20',
    rejected:
      'bg-red-500/10 text-red-600 border-red-500/20',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full border text-xs font-semibold ${styles[status]}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};

const getStatusLabel = (status: SellerApplicationStatus) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};


export default SellerApplicationDetails;