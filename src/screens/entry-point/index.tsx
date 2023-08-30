import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/loading-screen';
import CustomerStack from '../../navigation/customer-stack';
import LoginStack from '../../navigation/login-stack';
import SellerTabs from '../../navigation/seller-tabs';
import { RootState } from '../../redux/store';
import { initialSellerLoader } from '../../services/loaders/seller';
import { UserRole } from '../../types/user';

const EntryPoint = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loadingUser, setLoadingUser] = useState(true);
  const loadingContent = loadingUser;

  const userLoader = useCallback(async () => {
    if (user?.role === UserRole.SELLER) {
      await initialSellerLoader();
    }
    setLoadingUser(false);
  }, [user]);

  useEffect(() => {
    userLoader();
  }, [userLoader]);

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
