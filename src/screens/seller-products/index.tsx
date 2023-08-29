import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Screen from '../../components/screen';
import SellerProductListItem from '../../components/seller-product-list-item';
import Text from '../../components/text';
import { SellerProductsStackParamList } from '../../navigation/routes';
import { RootState } from '../../redux/store';
import { Product } from '../../types/product';

type Props = NativeStackScreenProps<
  SellerProductsStackParamList,
  'SELLER_PRODUCTS_LIST'
>;

const SellerProducts = ({ navigation }: Props) => {
  const products = useSelector((state: RootState) => state.products);

  const renderItem = ({ item }: { item: Product }) => {
    return <SellerProductListItem product={item} />;
  };

  return (
    <Screen>
      <Text>Seller Products</Text>
      <Button
        title="New Product"
        onPress={() => navigation.navigate('SELLER_NEW_PRODUCT')}
      />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={p => `seller-product-item-${p.id}`}
        contentContainerStyle={{ padding: 10 }}
      />
    </Screen>
  );
};

export default React.memo(SellerProducts);
