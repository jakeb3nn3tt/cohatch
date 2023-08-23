import React from 'react';
import SellerTabs from '../../navigation/seller-tabs';

const EntryPoint = () => {
  // if (!user) {
  //   return <LoginStack />;
  // }
  // if (user.role === UserRole.COSTUMER) {
  //   return <CostumerStack />;
  // }
  return <SellerTabs />;
  // return <SellerProducts />;
};

export default React.memo(EntryPoint);
