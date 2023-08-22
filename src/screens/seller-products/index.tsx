import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Screen from '../../components/screen';
import SellerProductListItem from '../../components/seller-product-list-item';
import Text from '../../components/text';
import { loadSellerProducts } from '../../services/loaders/seller';
import { Product } from '../../types/product';

const SellerProducts = () => {
  // const sellerProducts = useSelector(state => state.sellerProducts);
  const [loading, setLoading] = useState(false);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const products = await loadSellerProducts();
      setSellerProducts(products);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }: { item: Product }) => {
    return <SellerProductListItem product={item} />;
  };

  return (
    <Screen>
      <Text>Seller Products</Text>
      <FlatList
        data={sellerProducts}
        renderItem={renderItem}
        keyExtractor={p => `seller-product-item-${p.id}`}
        contentContainerStyle={{ padding: 10 }}
      />
    </Screen>
  );
};

export default React.memo(SellerProducts);
