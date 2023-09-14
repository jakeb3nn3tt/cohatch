import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import Eggs from '../../assets/images/eggs.png';
import { CustomerStackParamList } from '../../navigation/routes';
import { Product } from '../../types/product';
import { User } from '../../types/user';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  product: Product;
  seller: User;
};

const SaleProduct = ({ product, seller }: Props) => {
  const [totalSelected, setTotalSelected] = useState(1);
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<CustomerStackParamList, 'MAP'>>();
  const quantityAvailable = product.quantityAvailable;
  const price = product.price.sellerValue;

  const onChangeTotalSelected = (newChange: number) => {
    setTotalSelected(prev => {
      const newValue = prev + newChange;
      if (newValue > quantityAvailable || newValue < 0) {
        return prev;
      }
      return newValue;
    });
  };

  const onBuy = () => {
    navigation.navigate('PAYMENT_SCREEN', {
      product,
      quantity: totalSelected,
      seller,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={Eggs} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>I sell eggs</Text>
        <Text style={styles.text}>Price: ${price} / dozen</Text>
        <Text style={styles.text}>
          Quantity available: {quantityAvailable} dozens
        </Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.text}>I want:</Text>
          <TouchableOpacity onPress={() => onChangeTotalSelected(-1)}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{totalSelected}</Text>
          <TouchableOpacity onPress={() => onChangeTotalSelected(1)}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
        <Button title="Buy" color="#000" onPress={onBuy} />
      </View>
    </View>
  );
};

export default React.memo(SaleProduct);
