import {
  Smartphone,
  CreditCard,
  Banknote,
} from 'lucide-react';

import { paymentMethod } from '@/type/admin/payment';
import { useTranslation } from 'react-i18next';

interface PaymentMethodBadgeProps {
  method: paymentMethod;
  size?: 'sm' | 'md';
}


const PaymentBadge = ({
  method,
  size = 'md',
}: PaymentMethodBadgeProps) => {
    const { t } = useTranslation();
    const paymentMethodConfig: Record<
  paymentMethod,
  {
    label: string;
    icon: typeof Smartphone;
    className: string;
  }
> = {
  mvola: {
    label: 'MVola',
    icon: Smartphone,
    className:
      'bg-yellow-50 text-yellow-500 border-yellow-200',
  },

  orange_money: {
    label: 'Orange Money',
    icon: Smartphone,
    className:
      'bg-orange-50 text-orange-700 border-orange-200',
  },

  card: {
    label: t('Credit Card'),
    icon: CreditCard,
    className:
      'bg-blue-50 text-blue-700 border-blue-200',
  },

  cod: {
    label: t('Cash On Delivery'),
    icon: Banknote,
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};
  const config = paymentMethodConfig[method];

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-2.5 py-1.5 text-sm gap-1.5',
  };

  const iconSize = size === 'sm' ? 13 : 15;

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        font-medium
        whitespace-nowrap
        ${sizeClasses[size]}
        ${config.className}
      `}
    >
      <Icon size={iconSize} strokeWidth={2} />
      {config.label}
    </span>
  );
};
export  {PaymentBadge};