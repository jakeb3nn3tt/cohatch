import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { LoginStackParamList } from '../../navigation/routes';
import { createNewAccount } from '../../services/firebase/users';
import { UserRole } from '../../types/user';

type Props = NativeStackScreenProps<LoginStackParamList, 'COSTUMER_SIGNUP'>;

const CustomerSignup = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    setLoading(true);
    try {
      await createNewAccount(email, name, password, UserRole.COSTUMER);
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <Text>Customer Signup</Text>
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
      <Button title="Signup" onPress={onSignup} disabled={loading} />
    </Screen>
  );
};

export default React.memo(CustomerSignup);
