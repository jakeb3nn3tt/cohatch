import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Sale } from '../../types/product';
import SaleProduct from '../sale-product';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  sale: Sale;
};

const SaleComponent = ({ sale }: Props) => {
  const [show, setShow] = useState(false);
  const styles = useStyles();

  const onToggleOpen = () => {
    setShow(prev => !prev);
  };

  return (
    <View>
      {show && <SaleProduct product={sale.products[0]} />}
      <TouchableOpacity onPress={onToggleOpen} style={styles.container}>
        <Text style={styles.saleTitle}>{sale.seller.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SaleComponent);
