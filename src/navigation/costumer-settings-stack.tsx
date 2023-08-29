import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CreditCardInformation from '../screens/credit-card-information';
import Settings from '../screens/settings';
import { NO_HEADER_OPTION } from './constants';
import { CostumerSettingsStackParamList } from './routes';

const Stack = createNativeStackNavigator<CostumerSettingsStackParamList>();

const CostumerSettingsStack = () => (
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
  </Stack.Navigator>
);

export default React.memo(CostumerSettingsStack);
