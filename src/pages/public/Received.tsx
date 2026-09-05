import {
  CheckCircle2,
  Clock3,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from 'react-i18next';

export default function ApplicationReceived() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-[430px]">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <div className="w-[18px] h-[18px] rounded-[5px] border-2 border-primary-foreground flex items-center justify-center">
              <div className="w-2 h-1 border-b border-primary-foreground" />
            </div>
          </div>

          <span className="font-display text-[19px] font-semibold">
            MasoMarket
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-4">

          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2
                size={30}
                strokeWidth={2}
                className="text-primary"
              />
            </div>
          </div>

          <h1 className="font-display text-[25px] font-bold tracking-tight">
            {t("Application received")}
          </h1>

          <p className="text-muted-foreground text-[14px] mt-1">
            {t("Your seller application has been successfully submitted.")}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-5">

          {/* Status */}
          <div className="flex items-center gap-3 p-3 bg-secondary/50 border border-border rounded-lg">

            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Clock3
                size={19}
                className="text-accent"
              />
            </div>

            <div className="flex-1">
              <p className="text-[14px] font-semibold">
                {t("Pending review")}
              </p>

              <p className="text-[12px] text-muted-foreground mt-0.5">
                {t("An administrator is reviewing your application.")}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-5 space-y-4">

            {/* Submitted */}
            <div className="flex gap-3">

              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                <CheckCircle2
                  size={15}
                  strokeWidth={2.5}
                  className="text-primary-foreground"
                />
              </div>

              <div>
                <p className="text-[13px] font-semibold">
                  {t("Application submitted")}
                </p>

                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {t("Your seller information has been received.")}
                </p>
              </div>
            </div>

            {/* Review */}
            <div className="flex gap-3">

              <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Clock3
                  size={14}
                  className="text-accent"
                />
              </div>

              <div>
                <p className="text-[13px] font-semibold">
                  {t("Administrator review")}
                </p>

                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {t("You will be notified once a decision has been made.")}
                </p>
              </div>
            </div>

          </div>

          {/* Info */}
          <div className="mt-5 flex gap-2.5 p-3 bg-primary/5 border border-primary/10 rounded-lg">

            <ShieldCheck
              size={17}
              className="text-primary shrink-0 mt-0.5"
            />

            <p className="text-[12px] leading-relaxed text-muted-foreground">
              You don't need to submit your application again.
            </p>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              w-full
              h-11
              mt-5
              rounded-[10px]
              bg-primary
              text-primary-foreground
              font-semibold
              text-[14px]
              flex
              items-center
              justify-center
              gap-2
              transition-opacity
              hover:opacity-90
            "
          >
            <ArrowLeft size={16} />
            Back to marketplace
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] text-muted-foreground mt-3">
          © {new Date().getFullYear()} MasoMarket
        </p>
      </div>
    </div>
  );
}