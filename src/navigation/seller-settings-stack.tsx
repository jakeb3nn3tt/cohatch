import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Settings from '../screens/settings';
import { NO_HEADER_OPTION } from './constants';
import { SellerSettingsStackParamList } from './routes';

const Stack = createNativeStackNavigator<SellerSettingsStackParamList>();

const SellerSettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SETTINGS"
      component={Settings}
      options={NO_HEADER_OPTION}
    />
  </Stack.Navigator>
);

export default React.memo(SellerSettingsStack);
