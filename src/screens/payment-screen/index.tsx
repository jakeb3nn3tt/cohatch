import functions from '@react-native-firebase/functions';
import React, { useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { ValueType } from 'react-native-dropdown-picker';
// import { loadPaymentMethods } from '../../services/loaders/customer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Text from '../../components/text';
import { CustomerStackParamList } from '../../navigation/routes';
import { RootState } from '../../redux/store';
import { formatMoneyToStripe } from '../../utils/money';
import PaymentMethod from './payment-method';

const generatePayment = functions().httpsCallable('generatePayment');

type Props = NativeStackScreenProps<CustomerStackParamList, 'PAYMENT_SCREEN'>;

const PaymentScreen = ({ route, navigation }: Props) => {
  const seller = route.params.seller;
  const product = route.params.product;
  const productPrice = product.price.sellerValue;
  const quantity = route.params.quantity;
  const total = productPrice * quantity;
  const user = useSelector((state: RootState) => state.user);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<ValueType | null>(null);
  const [loading, setLoading] = useState(false);

  const onConfirmPayment = async () => {
    setLoading(true);
    try {
      const selectedPaymentMethod = selectedPaymentMethodId as string;
      if (selectedPaymentMethod) {
        const result = await generatePayment({
          amount: formatMoneyToStripe(total),
          currency: 'usd',
          customerId: user?.stripeId,
          paymentMethodId: selectedPaymentMethod,
          sellerId: seller.stripeId,
        });
        console.log('result.data', result.data);
        navigation.goBack();
      } else {
        console.log('Select a payment method');
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Product: {product.title}</Text>
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
