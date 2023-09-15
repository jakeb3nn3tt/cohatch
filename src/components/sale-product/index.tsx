import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Eggs from '../../assets/images/eggs.png';
import { CustomerStackParamList } from '../../navigation/routes';
import { RootState } from '../../redux/store';
import { Product } from '../../types/product';
import { SALE_STATUS } from '../../types/sale';
import { User } from '../../types/user';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  product: Product;
  seller: User;
};

const SaleProduct = ({ product, seller }: Props) => {
  const [totalSelected, setTotalSelected] = useState(1);
  const user = useSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NavigationProp<CustomerStackParamList, 'MAP'>>();
  const styles = useStyles();
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

  console.log('user', user);

  const onBuy = () => {
    navigation.navigate('PAYMENT_SCREEN', {
      sale: {
        customerId: user?.id || '',
        customerAccountId: user?.stripeId || '',
        products: [
          {
            id: product.id as string,
            quantity: totalSelected,
            title: product.title,
            value: price,
          },
        ],
        sellerAccountId: seller.stripeId,
        sellerId: seller.id,
        status: SALE_STATUS.CREATED,
        _createdAt: Date.now(),
      },
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
