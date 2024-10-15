import { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const useStripe = (publicKey: string): Stripe | null => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      if (!publicKey) return;
      const stripeInstance = await loadStripe(publicKey);
      setStripe(stripeInstance);
    };

    initializeStripe();
  }, [publicKey]);

  return stripe;
};

export default useStripe;
