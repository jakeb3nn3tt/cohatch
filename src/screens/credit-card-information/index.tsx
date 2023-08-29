import { CardField } from '@stripe/stripe-react-native';
import _ from 'lodash';
import React, { useState } from 'react';
import { Button, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import CreditCardListItem from '../../components/credit-card-list-item';
import Modal from '../../components/modal';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { RootState } from '../../redux/store';
import { saveUser } from '../../services/firebase/users';
import { CreditCard, User } from '../../types/user';
import { useStyles } from './styles';

const CreditCardInformation = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addingCard, setAddingCard] = useState<CreditCard>();
  const styles = useStyles();
  const creditCards = user?.creditCards;

  const onDeleteCard = async (deletingIndex: number) => {
    setLoading(true);
    try {
      const newUser = _.cloneDeep(user) as User;
      newUser.creditCards?.splice(deletingIndex, 1);
      await saveUser(newUser);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const onAddNewCard = async () => {
    setLoading(true);
    try {
      if (addingCard?.complete) {
        const newUser = _.cloneDeep(user) as User;
        if (!newUser.creditCards?.length) {
          newUser.creditCards = [addingCard];
        } else {
          newUser.creditCards?.push(addingCard);
        }
        await saveUser(newUser);
        setAddingCard(undefined);
        setShowModal(false);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <Text>Credit Card Information</Text>
      <View>
        <FlatList
          data={creditCards}
          renderItem={({ item, index }) => (
            <CreditCardListItem
              creditCard={item}
              onDelete={() => onDeleteCard(index)}
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
      <Button title="Add new card" onPress={() => setShowModal(true)} />
      <Modal visible={showModal} onClose={() => setShowModal(false)}>
        <View style={styles.modalView}>
          <CardField
            postalCodeEnabled={false}
            style={styles.cardFieldContainer}
            onCardChange={setAddingCard}
            autofocus
          />
          <Button
            title="Add card"
            onPress={onAddNewCard}
            disabled={!addingCard?.complete || loading}
          />
        </View>
      </Modal>
    </Screen>
  );
};

export default React.memo(CreditCardInformation);
