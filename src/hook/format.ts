export const formatPrice = (price: number) => `${price.toLocaleString('fr-MG')} Ar`;

export const formatMillionAr = (amount: number) => {
  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    return `${billions.toFixed(1).replace(/\.0$/, '')} Md Ar`;
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${millions.toFixed(1).replace(/\.0$/, '')} M Ar`;
  }

  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `${thousands.toFixed(1).replace(/\.0$/, '')} K Ar`;
  }

  return `${amount} Ar`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatOrderDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date));

export const formatTime = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));