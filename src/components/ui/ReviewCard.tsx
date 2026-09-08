import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui";
import { Rating } from "../../components/ui";
import { Review } from '@/type/catalog/store';
import { UserRole } from "@/type/user";

type ReviewCardProps = {
  review: Review;
  role: UserRole;
};

const ReviewCard = ({ review, role }: ReviewCardProps) => {
  const { t } = useTranslation();

  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    setIsReplying(false);
    setReplyText("");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
            {review.customerName[0]}
          </div>

          <div>
            <div className="font-medium text-sm text-secondary-foreground">
              {review.customerName}
            </div>

            <div className="text-xs text-muted-foreground">
              {review.productName}
            </div>
          </div>
        </div>

        <div className="text-right">
          <Rating
            value={review.rating}
            showCount={false}
            size="xs"
          />

          <div className="text-xs text-muted-foreground mt-0.5">
            {review.date}
          </div>
        </div>
      </div>

      <p className="text-sm text-secondary-foreground mb-3">
        {review.comment}
      </p>

      {review.replied ? (
        <div className="ml-4 p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="text-xs font-medium text-primary mb-1">
            {role==="admin" ? t("Seller Reply") : t("Your Reply") }
          </div>

          <p className="text-sm text-secondary-foreground">
            {review.reply}
          </p>
        </div>
      ) : isReplying && role==='seller' ? (
        <div className="ml-4 space-y-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={2}
            placeholder={t("Write your reply...")}
            className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-xl text-secondary-foreground focus:outline-none focus:border-primary resize-none"
          />

          <div className="flex gap-2">
            <Button
              size="xs"
              onClick={handleSendReply}
              disabled={!replyText.trim()}
            >
              {t("Send reply")}
            </Button>

            <Button
              size="xs"
              variant="ghost"
              onClick={() => {
                setIsReplying(false);
                setReplyText("");
              }}
            >
              {t("Cancel")}
            </Button>
          </div>
        </div>
      ) : role==='seller' ? (
        <button
          onClick={() => setIsReplying(true)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {t("Reply")}
        </button>
      ): null }
    </div>
  );
};

export  {ReviewCard};