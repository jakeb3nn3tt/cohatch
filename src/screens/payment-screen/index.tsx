import functions from '@react-native-firebase/functions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { ValueType } from 'react-native-dropdown-picker';
import Text from '../../components/text';
import { CustomerStackParamList } from '../../navigation/routes';
import { KnownError, handleError } from '../../utils/error-handler';
import PaymentMethod from './payment-method';

const generatePayment = functions().httpsCallable('generatePayment');

type Props = NativeStackScreenProps<CustomerStackParamList, 'PAYMENT_SCREEN'>;

const PaymentScreen = ({ route, navigation }: Props) => {
  const sale = route.params.sale;
  const productTitle = sale.products[0].id;
  const quantity = sale.products[0].quantity;
  const productPrice = sale.products[0].value;
  const total = productPrice * quantity;
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<ValueType | null>(null);
  const [loading, setLoading] = useState(false);

  const onConfirmPayment = async () => {
    setLoading(true);
    try {
      const selectedPaymentMethod = selectedPaymentMethodId as string;
      if (selectedPaymentMethod) {
        const result = await generatePayment({
          ...sale,
          total,
          paymentMethodId: selectedPaymentMethodId,
        });
        const data = result.data;
        console.log('data', data);
        if (data?.status !== 'succeeded' && data.code) {
          throw new KnownError(data.code, undefined, data.decline_code);
        }
        navigation.goBack();
      } else {
        console.log('Select a payment method');
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Product: {productTitle}</Text>
        <Text>Quantity: {quantity}</Text>
        <Text>Subtotal: ${total}</Text>
        <Text>Total: ${total}</Text>
      </View>
      <PaymentMethod
        selectedPaymentMethodId={selectedPaymentMethodId}
        setSelectedPaymentMethodId={setSelectedPaymentMethodId}
      />
      <Button
        title="Pay"
        onPress={onConfirmPayment}
        disabled={!selectedPaymentMethodId || loading}
      />
    </SafeAreaView>
  );
};

export default React.memo(PaymentScreen);
