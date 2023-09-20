import functions from '@react-native-firebase/functions';
import { useStripe } from '@stripe/stripe-react-native';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PaymentMethod } from '../types/user';

const getStripeCustomerSecret = functions().httpsCallable(
  'getStripeCustomerSecret',
);

const deleteStripeCustomerPaymentMethod = functions().httpsCallable(
  'deleteStripeCustomerPaymentMethod',
);

const getStripeCustomerPaymentMethods = functions().httpsCallable(
  'getStripeCustomerPaymentMethods',
);

type Props = {
  skipPaymentMethodsLoad?: boolean;
};

export const usePayment = (props?: Props) => {
  const skipPaymentMethodsLoad = props?.skipPaymentMethodsLoad;
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const loadPaymentMethods = useCallback(async () => {
    const result = await getStripeCustomerPaymentMethods({
      customerId: user?.stripeId,
    });
    return result?.data || [];
  }, [user?.stripeId]);

  const confirmHandler = useCallback(
    async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
      const { data: clientSecret } = await getStripeCustomerSecret({
        customerId: user?.stripeId,
      });
      intentCreationCallback({ clientSecret });
    },
    [user?.stripeId],
  );

  const initializePaymentSheet = useCallback(async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: user?.name || 'customer',
      intentConfiguration: {
        mode: {
          currencyCode: 'USD',
          setupFutureUsage: 'OffSession',
        },
        confirmHandler,
      },
    });
    if (!error) {
      // handle error
    }
  }, [confirmHandler, initPaymentSheet, user?.name]);

  const getPaymentMethods = useCallback(async () => {
    setLoadingPaymentMethods(true);
    const paymentMethodsResult = await loadPaymentMethods();
    setPaymentMethods(paymentMethodsResult);
    setLoadingPaymentMethods(false);
  }, [loadPaymentMethods]);

  const deletePaymentMethod = async (
    paymentMethodId: string,
    reloadPaymentMethods = true,
  ) => {
    await deleteStripeCustomerPaymentMethod({
      paymentMethodId,
    });
    if (reloadPaymentMethods) {
      await getPaymentMethods();
    }
  };

  const setupPayment = async (reloadPaymentMethods = true) => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.log('error', error);
    } else {
      if (reloadPaymentMethods) {
        await getPaymentMethods();
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  useEffect(() => {
    if (!skipPaymentMethodsLoad) {
      getPaymentMethods();
    }
  }, [user, skipPaymentMethodsLoad, getPaymentMethods]);

  return {
    loadingPaymentMethods,
    paymentMethods,
    setupPayment,
    getPaymentMethods,
    deletePaymentMethod,
    initializePaymentSheet,
  };
};
