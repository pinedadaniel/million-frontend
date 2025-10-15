
export const formatPrice = (
  price: number, 
  options?: {
    compact?: boolean;
    locale?: string;
  }
): string => {
  const { compact = false, locale = 'en-US' } = options || {};

  if (compact && price >= 1000000) {
    const millions = price / 1000000;
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: millions % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 1,
    }).format(millions) + 'M';
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPropertyPrice = (price: number): string => {
  return formatPrice(price);
};


