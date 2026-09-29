import { createContext, useContext, useState, ReactNode } from 'react';

export const USD_TO_INR_RATE = 88.50;

interface CurrencyContextType {
  currency: 'INR' | 'USD';
  toggleCurrency: () => void;
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (amountInINR: number, options?: { perKg?: boolean }) => string;
  convertFromUSD: (amountInUSD: number) => number;
  convertToUSD: (amountInINR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Default to INR as requested by user
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const convertFromUSD = (amountInUSD: number) => amountInUSD * USD_TO_INR_RATE;
  const convertToUSD = (amountInINR: number) => amountInINR / USD_TO_INR_RATE;

  const formatPrice = (amountInINR: number, options?: { perKg?: boolean }) => {
    const isPerKg = options?.perKg ?? false;

    if (currency === 'INR') {
      const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amountInINR);
      return isPerKg ? `${formatted} / kg` : formatted;
    } else {
      const amountUSD = amountInINR / USD_TO_INR_RATE;
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountUSD);
      return isPerKg ? `${formatted} / kg` : formatted;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        toggleCurrency,
        setCurrency,
        formatPrice,
        convertFromUSD,
        convertToUSD,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback if rendered outside provider
    return {
      currency: 'INR' as const,
      toggleCurrency: () => {},
      setCurrency: () => {},
      formatPrice: (amountInINR: number, options?: { perKg?: boolean }) => {
        const formatted = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(amountInINR);
        return options?.perKg ? `${formatted} / kg` : formatted;
      },
      convertFromUSD: (usd: number) => usd * USD_TO_INR_RATE,
      convertToUSD: (inr: number) => inr / USD_TO_INR_RATE,
    };
  }
  return context;
}
