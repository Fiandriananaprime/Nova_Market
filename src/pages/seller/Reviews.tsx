import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Rating, Button } from '../../components/ui';
import { useTranslation } from 'react-i18next';

const reviews = [
  { id: '1', customer: 'Rakoto A.', rating: 5, product: 'Samsung Galaxy A56', comment: 'Excellent product, exactly as described. Very fast shipping!', date: '2026-08-28', replied: false },
  { id: '2', customer: 'Marie R.', rating: 4, product: 'MacBook Air M3', comment: 'Great laptop, good performance. Battery life is amazing.', date: '2026-08-25', replied: true, reply: 'Thank you Marie! We appreciate your feedback.' },
  { id: '3', customer: 'Jean P.', rating: 5, product: 'AirPods Pro 2nd Gen', comment: 'Best earphones I have ever bought. The noise cancellation is incredible!', date: '2026-08-20', replied: false },
  { id: '4', customer: 'Alice M.', rating: 3, product: 'Samsung Galaxy A56', comment: 'Good phone but the charging speed could be better.', date: '2026-08-18', replied: false },
];

export default function SellerReviews() {
  const { t } = useTranslation();
  const [replyModal, setReplyModal] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold font-display text-foreground mb-5">{t("Reviews")}</h1>

      <div className="bg-card border border-border rounded-xl p-5 mb-5 flex items-center gap-8">
        <div className="text-center">
          <div className="text-5xl font-bold font-display text-foreground">{avg.toFixed(1)}</div>
          <Rating value={avg} showCount={false} size="md" />
          <div className="text-sm text-muted-foreground mt-1">{reviews.length} {t("reviews")}</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map(r => {
            const count = reviews.filter(rev => rev.rating === r).length;
            return (
              <div key={r} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-muted-foreground">{r}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-1.5 bg-border rounded-full">
                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(count / reviews.length) * 100}%` }} />
                </div>
                <span className="w-4 text-muted-foreground">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center text-white text-sm font-bold">{review.customer[0]}</div>
                <div>
                  <div className="font-medium text-sm text-foreground">{review.customer}</div>
                  <div className="text-xs text-muted-foreground">{review.product}</div>
                </div>
              </div>
              <div className="text-right">
                <Rating value={review.rating} showCount={false} size="xs" />
                <div className="text-xs text-muted-foreground mt-0.5">{review.date}</div>
              </div>
            </div>
            <p className="text-sm text-foreground mb-3">{review.comment}</p>

            {review.replied ? (
              <div className="ml-4 p-3 bg-[#0077B6]/5 border border-[#0077B6]/20 rounded-xl">
                <div className="text-xs font-medium text-[#0077B6] mb-1">{t("Your reply")}</div>
                <p className="text-sm text-foreground">{review.reply}</p>
              </div>
            ) : (
              replyModal === review.id ? (
                <div className="ml-4 space-y-2">
                  <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={2} placeholder={t("Write your reply...")} className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:border-[#0077B6] resize-none" />
                  <div className="flex gap-2">
                    <Button size="xs" onClick={() => { setReplyModal(null); setReplyText(''); }}>{t("Send reply")}</Button>
                    <Button size="xs" variant="ghost" onClick={() => setReplyModal(null)}>{t("Cancel")}</Button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setReplyModal(review.id)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0077B6] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {t("Reply")}
                </button>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
