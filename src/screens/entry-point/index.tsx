import React from 'react';
import { useSelector } from 'react-redux';
import CostumerStack from '../../navigation/costumer-stack';
import LoginStack from '../../navigation/login-stack';
import SellerTabs from '../../navigation/seller-tabs';
import { RootState } from '../../redux/store';
import { UserRole } from '../../types/user';

const EntryPoint = () => {
  const user = useSelector((state: RootState) => state.user);
  if (!user) {
    return <LoginStack />;
  }
  if (user.role === UserRole.COSTUMER) {
    return <CostumerStack />;
  }
  return <SellerTabs />;
};

export default React.memo(EntryPoint);
