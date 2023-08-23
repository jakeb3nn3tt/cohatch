import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CostumerSignup from '../screens/costumer-signup';
import Login from '../screens/login';
import SellerSignup from '../screens/seller-signup';
import { NO_HEADER_OPTION } from './constants';
import { LoginStackParamList } from './routes';

const Stack = createNativeStackNavigator<LoginStackParamList>();

const CostumerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="LOGIN" component={Login} options={NO_HEADER_OPTION} />
    <Stack.Screen
      name="SELLER_SIGNUP"
      component={SellerSignup}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="COSTUMER_SIGNUP"
      component={CostumerSignup}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(CostumerStack);
