import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SellerSalesStackParamList } from '../../navigation/routes';
import { Sale } from '../../types/sale';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  sale: Sale;
};

const SellerSaleListItem = ({ sale }: Props) => {
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<SellerSalesStackParamList, 'SELLER_SALES'>>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('SELLER_SALE_DETAILS', { sale })}>
      <Text>{sale.id}</Text>
      <View style={styles.infoContainer}>
        <Text>${sale.total}</Text>
        <Text>{sale.status}</Text>
        <Text>{new Date(sale._createdAt).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SellerSaleListItem);
