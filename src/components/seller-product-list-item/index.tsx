import { NavigationProp, useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import Eggs from '../../assets/images/eggs.png';
import Text from '../../components/text';
import { SellerProductsStackParamList } from '../../navigation/routes';
import { saveProduct } from '../../services/firebase/products';
import { loadSellerProducts } from '../../services/loaders/seller';
import { Product } from '../../types/product';
import { handleError } from '../../utils/error-handler';
import { useStyles } from './styles';

type Props = {
  product: Product;
};

const SellerProductListItem = ({ product }: Props) => {
  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  const isListed = product.isListed;
  const navigation =
    useNavigation<
      NavigationProp<SellerProductsStackParamList, 'SELLER_PRODUCTS_LIST'>
    >();

  const onList = async () => {
    setLoading(true);
    try {
      const newProduct = _.cloneDeep(product);
      newProduct.isListed = !isListed;
      await saveProduct(newProduct);
      await loadSellerProducts();
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Image source={Eggs} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.leftContentHeader}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>Quantity</Text>
            <View style={styles.quantityCountContainer}>
              <Text>Avilable: {product.quantityAvailable}</Text>
              <Text>Total: {product.quantityTotal}</Text>
            </View>
            <Text style={styles.unitText}>Unit: {product.quantityUnit}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Price</Text>
        <View>
          <Text>
            Seller Value: {product.price.sellerValue} {product.price.currency}
          </Text>
          <Text>
            Final Value: {product.price.finalValue ?? '--'}{' '}
            {product.price.currency}
          </Text>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={{ flex: 1 }}>
          <Button
            title={isListed ? 'Unlist' : 'List'}
            onPress={onList}
            disabled={loading}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="Edit"
            disabled={loading}
            onPress={() =>
              navigation.navigate('SELLER_NEW_PRODUCT', { product })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(SellerProductListItem);
