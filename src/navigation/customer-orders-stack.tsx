import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CustomerOrderDetails from '../screens/customer-order-details';
import CustomerOrders from '../screens/customer-orders';
import { NO_HEADER_OPTION } from './constants';
import { CustomerOrdersStackParamList } from './routes';

const Stack = createNativeStackNavigator<CustomerOrdersStackParamList>();

const CustomerOrdersStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="CUSTOMER_ORDERS"
      component={CustomerOrders}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="CUSTOMER_ORDER_DETAILS"
      component={CustomerOrderDetails}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(CustomerOrdersStack);
