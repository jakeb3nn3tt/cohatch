import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Image, View } from 'react-native';
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

const NearSaleSearchListItem = ({ product, seller }: Props): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NavigationProp<CustomerStackParamList, 'SEARCH'>>();
  const styles = useStyles();

  const onBuy = () => {
    navigation.navigate('PAYMENT_SCREEN', {
      sale: {
        customerId: user?.id || '',
        customerAccountId: user?.stripeId || '',
        products: [
          {
            id: product.id as string,
            quantity: 1,
            title: product.title,
            value: product.price.sellerValue,
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
      <View style={styles.productContainer}>
        <Image source={Eggs} style={styles.image} />
        <View>
          <Text>{product.title}</Text>
          <Text>$ {product.price.sellerValue}</Text>
          <Text>Seller: {seller.name}</Text>
        </View>
      </View>
      <Button title="Buy" onPress={onBuy} />
    </View>
  );
};

export default React.memo(NearSaleSearchListItem);
