import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Map from '../screens/map';
import PaymentScreen from '../screens/payment-screen';
import { NO_HEADER_OPTION } from './constants';
import CustomerOrdersStack from './customer-orders-stack';
import CustomerSettingsStack from './customer-settings-stack';
import { CustomerStackParamList } from './routes';

const Stack = createNativeStackNavigator<CustomerStackParamList>();

const CustomerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MAP" component={Map} options={NO_HEADER_OPTION} />
    <Stack.Screen
      name="PAYMENT_SCREEN"
      component={PaymentScreen}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="CUSTOMER_SETTINGS_STACK"
      component={CustomerSettingsStack}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="CUSTOMER_ORDERS_STACK"
      component={CustomerOrdersStack}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(CustomerStack);
