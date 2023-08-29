import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import SellerFeed from '../screens/seller-feed';
import { NO_HEADER_OPTION } from './constants';
import { SellerBottomTabParamList } from './routes';
import SellerProductsStack from './seller-products-stack';
import SellerSettingsStack from './seller-settings-stack';

const Tab = createBottomTabNavigator<SellerBottomTabParamList>();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SELLER_FEED"
        component={SellerFeed}
        options={{
          ...NO_HEADER_OPTION,
          title: 'Feed',
        }}
      />
      <Tab.Screen
        name="SELLER_PRODUCTS"
        component={SellerProductsStack}
        options={{
          ...NO_HEADER_OPTION,
          title: 'Products',
        }}
      />
      <Tab.Screen
        name="SELLER_SETTINGS_STACK"
        component={SellerSettingsStack}
        options={{
          ...NO_HEADER_OPTION,
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(BottomTab);
