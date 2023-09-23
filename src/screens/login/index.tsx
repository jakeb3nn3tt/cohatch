import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { LoginStackParamList } from '../../navigation/routes';
import { setUser } from '../../redux/reducers/user';
import { login } from '../../services/firebase/users';

type Props = NativeStackScreenProps<LoginStackParamList, 'LOGIN'>;

const Login = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogin = async () => {
    setLoading(true);
    try {
      const user = await login(email, password);
      dispatch(setUser(user));
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <Text>Login</Text>
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
      <Button title="Login" onPress={onLogin} disabled={loading} />
      <Text>Sign up</Text>
      <Button
        title="I wanna buy"
        onPress={() => navigation.navigate('CUSTOMER_SIGNUP')}
      />
      <Button
        title="I wanna sell"
        onPress={() => navigation.navigate('SELLER_SIGNUP')}
      />
    </Screen>
  );
};

export default React.memo(Login);
