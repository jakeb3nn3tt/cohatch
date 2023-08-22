import { CardField, useStripe } from '@stripe/stripe-react-native';
import React from 'react';
import { Button, SafeAreaView } from 'react-native';

const PaymentScreen = () => {
  const { confirmPayment } = useStripe();

  const onConfirmPayment = async () => {
    try {
      // const clientSecret = await getClientSecret();
      const result = await confirmPayment(
        'pi_3Ni27KBf6uI5vbOW18BqYQdz_secret_wr0GgzRMeVXz3EqQSw85BB2gJ',
        {
          paymentMethodType: 'Card',
        },
      );
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button title="Pay" onPress={onConfirmPayment} />
    </SafeAreaView>
  );
};

export default React.memo(PaymentScreen);
