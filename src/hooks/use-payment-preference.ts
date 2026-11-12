import { Bank, CreditCard, Icon, QrCode, Wallet } from '@phosphor-icons/react';
import React from 'react';
import {
  BrowserStorageKeys,
  browserStorage,
} from 'common/repositories/browser-storage';
import type { PaymentMethod } from 'api-hooks/bookings';

export const PAYMENT_METHODS: { id: PaymentMethod; icon: Icon }[] = [
  { id: 'ewallet', icon: Wallet },
  { id: 'qris', icon: QrCode },
  { id: 'va', icon: Bank },
  { id: 'card', icon: CreditCard },
];

const DEFAULT_METHOD: PaymentMethod = 'ewallet';
const isMethod = (v: string | null): v is PaymentMethod =>
  PAYMENT_METHODS.some((m) => m.id === v);

// The method preselected at checkout, chosen on the profile page
export default function usePaymentPreference() {
  const [method, setMethod] = React.useState<PaymentMethod>(DEFAULT_METHOD);

  React.useEffect(() => {
    const saved = browserStorage.get(BrowserStorageKeys.PaymentMethod);
    if (isMethod(saved)) setMethod(saved);
  }, []);

  const save = React.useCallback((m: PaymentMethod) => {
    setMethod(m);
    browserStorage.set(BrowserStorageKeys.PaymentMethod, m);
  }, []);

  return { method, save };
}
