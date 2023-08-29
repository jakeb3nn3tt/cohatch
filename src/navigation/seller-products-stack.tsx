import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SellerNewProduct from '../screens/seller-new-product';
import SellerProducts from '../screens/seller-products';
import { NO_HEADER_OPTION } from './constants';
import { SellerProductsStackParamList } from './routes';

const Stack = createNativeStackNavigator<SellerProductsStackParamList>();

const SellerProductsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SELLER_PRODUCTS_LIST"
      component={SellerProducts}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="SELLER_NEW_PRODUCT"
      component={SellerNewProduct}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(SellerProductsStack);
