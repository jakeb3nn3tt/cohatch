import _ from 'lodash';
import React from 'react';
import { Button, View } from 'react-native';
import { PaymentMethod } from '../../types/user';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  paymentMethod: PaymentMethod;
  disabled?: boolean;
  onDelete: () => void;
};

const PaymentMethodListItem = ({
  paymentMethod,
  disabled,
  onDelete,
}: Props) => {
  const styles = useStyles();
  if (!paymentMethod.card) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text>{_.upperFirst(paymentMethod.card.brand)}</Text>
      <Text>***** {paymentMethod.card.last4}</Text>
      <Button title="Del" color="#A00" onPress={onDelete} disabled={disabled} />
    </View>
  );
};

export default React.memo(PaymentMethodListItem);
