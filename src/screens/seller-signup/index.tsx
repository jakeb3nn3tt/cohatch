import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import AddressSelector from '../../components/address-selector';
import Modal from '../../components/modal';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { LoginStackParamList } from '../../navigation/routes';
import { createNewAccount } from '../../services/firebase/users';
import { UserAddress, UserRole } from '../../types/user';
import { handleError } from '../../utils/error-handler';

type Props = NativeStackScreenProps<LoginStackParamList, 'SELLER_SIGNUP'>;

const SellerSignup = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<UserAddress>();
  const [modalOpen, setModalOpen] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    if (!address) {
      return;
    }
    try {
      await createNewAccount(email, name, password, UserRole.SELLER, address);
      navigation.goBack();
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const onChangeAddress = (newAddress: UserAddress) => {
    setAddress(newAddress);
    setModalOpen(false);
  };

  return (
    <Screen>
      <Text>Seller Signup</Text>
      <View>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text>My Address: {address?.address}</Text>
        <Button
          title={address ? 'Change' : 'Select'}
          onPress={() => setModalOpen(true)}
        />
      </View>
      <Button title="Signup" onPress={onSignup} disabled={loading} />
      <Modal visible={modalOpen} onClose={() => setModalOpen(false)}>
        <AddressSelector currentAddress={address} onChange={onChangeAddress} />
      </Modal>
    </Screen>
  );
};

export default React.memo(SellerSignup);
