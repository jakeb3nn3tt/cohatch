import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ActivityIndicator, Button, View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import Text from '../../../components/text';
import { usePayment } from '../../../hooks/usePayment';
import { useStyles } from './styles';

type Props = {
  selectedPaymentMethodId: ValueType | null;
  setSelectedPaymentMethodId: Dispatch<SetStateAction<ValueType | null>>;
};

const PaymentMethod = ({
  selectedPaymentMethodId,
  setSelectedPaymentMethodId,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { paymentMethods, loadingPaymentMethods, setupPayment } = usePayment();
  const styles = useStyles();
  const dropdownCards = useMemo(() => {
    return (
      paymentMethods
        ?.filter(p => !!p.card)
        .map(p => ({
          label: `***** ${p.card.last4}`,
          value: p.id,
        })) || []
    );
  }, [paymentMethods]);
  const hasCards = !!dropdownCards.length;

  const onSetupPayment = async () => {
    setLoading(true);
    await setupPayment();
    setLoading(false);
  };

  if (loadingPaymentMethods) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paymentText}>Payment</Text>
      <View>
        {!hasCards && (
          <View>
            <Button title="Add a Credit Card" onPress={onSetupPayment} />
          </View>
        )}
        {!!hasCards && (
          <View style={{ zIndex: 10 }}>
            <DropDownPicker
              multiple={false}
              open={isOpen}
              setOpen={setIsOpen}
              value={selectedPaymentMethodId}
              setValue={setSelectedPaymentMethodId}
              items={dropdownCards}
              placeholder="Select a credit card"
            />
            <Button title="Add a new Credit Card" onPress={onSetupPayment} />
          </View>
        )}
      </View>
    </View>
  );
};

export default React.memo(PaymentMethod);
