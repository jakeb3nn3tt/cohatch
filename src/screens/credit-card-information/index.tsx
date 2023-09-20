import React, { useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import LoadingScreen from '../../components/loading-screen';
import PaymentMethodListItem from '../../components/payment-method-list-item';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { usePayment } from '../../hooks/usePayment';
import { useStyles } from './styles';

const CreditCardInformation = () => {
  const [loading, setLoading] = useState(false);
  const {
    loadingPaymentMethods,
    paymentMethods,
    setupPayment,
    deletePaymentMethod,
    initializePaymentSheet,
  } = usePayment();
  const styles = useStyles();

  if (loadingPaymentMethods) {
    return <LoadingScreen />;
  }

  const onDeleteCard = async (deletingId: string) => {
    setLoading(true);
    await deletePaymentMethod(deletingId);
    setLoading(false);
  };

  const onSetupPayment = async () => {
    setLoading(true);
    await setupPayment();
    await initializePaymentSheet();
    setLoading(false);
  };

  return (
    <Screen>
      <Text>Credit Card Information</Text>
      <View>
        <FlatList
          data={paymentMethods}
          renderItem={({ item }) => (
            <PaymentMethodListItem
              paymentMethod={item}
              onDelete={() => onDeleteCard(item.id)}
              disabled={loading}
            />
          )}
          ListEmptyComponent={
            <View>
              <Text>You have no credit cards saved.</Text>
            </View>
          }
        />
      </View>
      <Button title="Add new card" onPress={onSetupPayment} />
    </Screen>
  );
};

export default React.memo(CreditCardInformation);
