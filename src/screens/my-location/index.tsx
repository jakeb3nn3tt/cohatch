import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useSelector } from 'react-redux';
import AddressSelector from '../../components/address-selector';
import Modal from '../../components/modal';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { RootState } from '../../redux/store';
import { saveUser } from '../../services/firebase/users';
import { User, UserAddress } from '../../types/user';

const MyLocation = () => {
  const user = useSelector((state: RootState) => state.user as User);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onChangeAddress = async (newAddress: UserAddress) => {
    setLoading(true);
    try {
      await saveUser({
        ...user,
        address: newAddress,
      });
      setModalOpen(false);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <View>
        <Text>My Location</Text>
        <View>
          <Text>{user.address?.address}</Text>
        </View>
        <Button title="Change my Location" onPress={() => setModalOpen(true)} />
      </View>
      <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
        <AddressSelector
          currentAddress={user.address}
          onChange={onChangeAddress}
        />
      </Modal>
    </Screen>
  );
};

export default React.memo(MyLocation);
