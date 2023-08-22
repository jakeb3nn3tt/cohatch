import React from 'react';
import { Button, Image, View } from 'react-native';
import Eggs from '../../assets/images/eggs.png';
import Text from '../../components/text';
import { Product } from '../../types/product';
import { useStyles } from './styles';

type Props = {
  product: Product;
};

const SellerProductListItem = ({ product }: Props) => {
  const styles = useStyles();
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
          <Button title="List" />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Delete" color="red" />
        </View>
      </View>
    </View>
  );
};

export default React.memo(SellerProductListItem);
