import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SellerSaleDetails from '../screens/seller-sale-details';
import SellerSales from '../screens/seller-sales';
import { NO_HEADER_OPTION } from './constants';
import { SellerSalesStackParamList } from './routes';

const Stack = createNativeStackNavigator<SellerSalesStackParamList>();

const SellerSalesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SELLER_SALES"
      component={SellerSales}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="SELLER_SALE_DETAILS"
      component={SellerSaleDetails}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(SellerSalesStack);
