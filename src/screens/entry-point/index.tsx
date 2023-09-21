import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/loading-screen';
import CustomerStack from '../../navigation/customer-stack';
import LoginStack from '../../navigation/login-stack';
import SellerTabs from '../../navigation/seller-tabs';
import { RootState } from '../../redux/store';
import { initialSellerLoader } from '../../services/loaders/seller';
import { checkPaymentInfo } from '../../services/loaders/stripe-seller';
import { UserRole } from '../../types/user';
import StripeLoader from '../stripe-loader';
import { initialCustomerLoader } from '../../services/loaders/customer';

const EntryPoint = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const loadingContent = loadingUser || loadingStripe;

  const userLoader = useCallback(async () => {
    if (user?.role === UserRole.SELLER) {
      await checkPaymentInfo(user.stripeId, () => setLoadingStripe(true));
      await initialSellerLoader();
    } else {
      await initialCustomerLoader();
    }
    setLoadingUser(false);
  }, [user]);

  useEffect(() => {
    userLoader();
  }, [userLoader]);

  if (loadingStripe && user) {
    return (
      <StripeLoader
        accountId={user.stripeId}
        onFinish={() => setLoadingStripe(false)}
      />
    );
  }

  if (loadingContent) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginStack />;
  }
  if (user.role === UserRole.COSTUMER) {
    return <CustomerStack />;
  }
  return <SellerTabs />;
};

export default React.memo(EntryPoint);
