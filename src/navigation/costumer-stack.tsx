import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Map from '../screens/map';
import PaymentScreen from '../screens/payment-screen';
import { NO_HEADER_OPTION } from './constants';
import { CostumerStackParamList } from './routes';

const Stack = createNativeStackNavigator<CostumerStackParamList>();

const CostumerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MAP" component={Map} options={NO_HEADER_OPTION} />
    <Stack.Screen
      name="PAYMENT_SCREEN"
      component={PaymentScreen}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(CostumerStack);
