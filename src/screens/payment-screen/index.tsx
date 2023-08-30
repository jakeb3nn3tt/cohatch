import { CardField } from '@stripe/stripe-react-native';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { Button, SafeAreaView, Switch, View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import Text from '../../components/text';
import { RootState } from '../../redux/store';
import { CreditCard } from '../../types/user';
import { addCreditCard } from '../../utils/user';
import { useStyles } from './styles';

const PaymentScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [addingCard, setAddingCard] = useState<CreditCard>();
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<ValueType | null>(null);
  const dropdownCards = useMemo(() => {
    return (
      user?.creditCards?.map((c, index) => ({
        label: `***** ${c.last4}`,
        value: index,
      })) || []
    );
  }, [user]);
  const styles = useStyles();
  const hasCards = !!dropdownCards.length;
  const paymentDisabled =
    loading ||
    (hasCards && _.isNil(selectedCreditCard)) ||
    (!hasCards && !addingCard?.complete);

  const onConfirmPayment = async () => {
    setLoading(true);
    try {
      let selectedCard = null;
      if (saveCard && addingCard?.complete) {
        await addCreditCard(addingCard);
        setSaveCard(false);
        setAddingCard(undefined);
        selectedCard = addingCard;
      } else {
        selectedCard = user?.creditCards?.[selectedCreditCard as number];
      }
      console.log('selectedCard', selectedCard);
      // if (selectedCard) {
      //   const { data } = await getClientSecret({ amount: 1234 });
      //   const result = await confirmPayment(data, {
      //     paymentMethodType: 'Card',
      //   });
      //   console.log('result', result);
      // } else {
      //   console.log('Select a car');
      // }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      {!hasCards && (
        <View>
          <CardField
            postalCodeEnabled={false}
            style={styles.cardFieldContainer}
            onCardChange={setAddingCard}
            autofocus
          />
          <View>
            <Text>Save card for future payments</Text>
            <Switch value={saveCard} onValueChange={setSaveCard} />
          </View>
        </View>
      )}
      {!!hasCards && (
        <DropDownPicker
          multiple={false}
          open={isOpen}
          setOpen={setIsOpen}
          value={selectedCreditCard}
          setValue={setSelectedCreditCard}
          items={dropdownCards}
          placeholder="Select a credit card"
        />
      )}
      <Button
        title="Pay"
        onPress={onConfirmPayment}
        disabled={paymentDisabled}
      />
    </SafeAreaView>
  );
};

export default React.memo(PaymentScreen);
