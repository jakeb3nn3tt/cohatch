import React from 'react';
import { Button, View } from 'react-native';
import { CreditCard } from '../../types/user';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  creditCard: CreditCard;
  disabled?: boolean;
  onDelete: () => void;
};

const CreditCardListItem = ({ creditCard, disabled, onDelete }: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>{creditCard.brand}</Text>
      <Text>***** {creditCard.last4}</Text>
      <Button title="Del" color="#A00" onPress={onDelete} disabled={disabled} />
    </View>
  );
};

export default React.memo(CreditCardListItem);
