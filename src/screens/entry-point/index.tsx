import React from 'react';
import CostumerStack from '../../navigation/costumer-stack';

const EntryPoint = () => {
  // if (!user) {
  //   return <LoginStack />;
  // }
  // if (user.role === UserRole.COSTUMER) {
  //   return <CostumerStack />;
  // }
  // return <SellerTabs />;
  // return <SellerProducts />;
  return <CostumerStack />;
};

export default React.memo(EntryPoint);
