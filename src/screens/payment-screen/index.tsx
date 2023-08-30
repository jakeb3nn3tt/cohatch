import functions from '@react-native-firebase/functions';
import React, { useMemo, useState } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/loading-screen';
import { RootState } from '../../redux/store';
// import { loadPaymentMethods } from '../../services/loaders/customer';
import { usePayment } from '../../hooks/usePayment';
import { useStyles } from './styles';

const createPaymentIntent = functions().httpsCallable('createPaymentIntent');

const addingCard = null;

const PaymentScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { paymentMethods, loadingPaymentMethods, setupPayment } = usePayment();
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<ValueType | null>(null);
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
  const styles = useStyles();
  const hasCards = !!dropdownCards.length;
  const paymentDisabled =
    loading || (hasCards && !selectedPaymentMethodId) || !hasCards;

  const onConfirmPayment = async () => {
    setLoading(true);
    try {
      const selectedPaymentMethod = selectedPaymentMethodId as string;
      if (selectedPaymentMethod) {
        const result = await createPaymentIntent({
          amount: 12345,
          currency: 'usd',
          customerId: user?.stripeId,
          paymentMethodId: selectedPaymentMethod,
        });
        console.log('result.data', result.data);
      } else {
        console.log('Select a payment method');
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const onSetupPayment = async () => {
    setLoading(true);
    await setupPayment();
    setLoading(false);
  };

  if (loadingPaymentMethods) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView>
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
        <Button
          title="Pay"
          onPress={onConfirmPayment}
          disabled={paymentDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(PaymentScreen);
