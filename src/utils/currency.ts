const CURRENCY_FORMATS = {
  TND: {
    locale: 'fr-TN',
    currency: 'TND',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  },
  USD: {
    locale: 'en-US',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  USDT: {
    locale: 'en-US',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};

export function formatCurrency(amount: number, currency: keyof typeof CURRENCY_FORMATS = 'TND'): string {
  const format = CURRENCY_FORMATS[currency];
  
  try {
    return new Intl.NumberFormat(format.locale, {
      style: 'currency',
      currency: format.currency,
      minimumFractionDigits: format.minimumFractionDigits,
      maximumFractionDigits: format.maximumFractionDigits,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting error:', error);
    return `${amount} ${currency}`;
  }
} 