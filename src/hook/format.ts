export const formatPrice = (price: number) => `${price.toLocaleString('fr-MG')} Ar`;

export const formatMillionAr = (amount: number) => {
  const millions = amount / 1_000_000;
  return `${millions.toFixed(1).replace(/\.0$/, '')}M Ar`;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};