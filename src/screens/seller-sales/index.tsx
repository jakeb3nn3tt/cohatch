import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../components/screen';
import SellerSaleListItem from '../../components/seller-sale-list-item';
import Text from '../../components/text';
import { RootState } from '../../redux/store';

const SellerSales = () => {
  const sales = useSelector((state: RootState) => state.sales);
  // create refresh option

  return (
    <Screen>
      <Text>My Sales</Text>
      <FlatList
        data={sales}
        renderItem={({ item }) => <SellerSaleListItem sale={item} />}
        ListEmptyComponent={
          <View>
            <Text>You haven't made any sales yet.</Text>
          </View>
        }
      />
    </Screen>
  );
};

export default React.memo(SellerSales);
