import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreditCardInformation from '../screens/credit-card-information';
import MyLocation from '../screens/my-location';
import Settings from '../screens/settings';
import { NO_HEADER_OPTION } from './constants';
import { CustomerSettingsStackParamList } from './routes';

const Stack = createNativeStackNavigator<CustomerSettingsStackParamList>();

const CustomerSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SETTINGS"
      component={Settings}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="CREDIT_CARD_INFORMATION"
      component={CreditCardInformation}
      options={NO_HEADER_OPTION}
    />
    <Stack.Screen
      name="MY_LOCATION"
      component={MyLocation}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(CustomerSettingsStack);
