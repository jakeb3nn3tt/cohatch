import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CustomerOrderListItem from '../../components/customer-order-list-item';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { RootState } from '../../redux/store';

const CustomerOrders = () => {
  const sales = useSelector((state: RootState) => state.sales);

  return (
    <Screen>
      <Text>My Orders</Text>
      <FlatList
        data={sales}
        renderItem={({ item }) => <CustomerOrderListItem sale={item} />}
        ListEmptyComponent={
          <View>
            <Text>You haven't ordered anything yet.</Text>
          </View>
        }
      />
    </Screen>
  );
};

export default React.memo(CustomerOrders);
