import React, { useMemo, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import NearSaleSearchListItem from '../../components/near-sale-search-list-item';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { RootState } from '../../redux/store';
import { Product } from '../../types/product';
import { User } from '../../types/user';
import { getSearchString } from '../../utils/string';
import { useStyles } from './styles';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const nearSales = useSelector((state: RootState) => state.nearSales);
  const filteredProducts = useMemo(() => {
    const newProducts: { product: Product; seller: User }[] = [];
    for (let i = 0; i < nearSales.length; i++) {
      const ns = nearSales[i];
      for (let j = 0; j < ns.products.length; j++) {
        const product = ns.products[j];
        if (
          !search.length ||
          getSearchString(product.title).includes(getSearchString(search))
        ) {
          newProducts.push({
            product,
            seller: ns.seller,
          });
        }
      }
    }
    return newProducts;
  }, [nearSales, search]);
  const styles = useStyles();

  return (
    <Screen style={styles.container}>
      <View>
        <TextInput
          value={search}
          placeholder="Search"
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <NearSaleSearchListItem product={item.product} seller={item.seller} />
        )}
        keyExtractor={item => `near-sale-list-item-${item.product.id}`}
        ListEmptyComponent={
          <View>
            <Text>No products found</Text>
          </View>
        }
      />
    </Screen>
  );
};

export default React.memo(Search);
