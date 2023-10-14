import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import Text from '../components/text';

export const toastConfig = {
  info: ({ text1 }: { text1?: string }) => (
    <View
      style={{
        padding: 10,
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
      }}>
      <Text style={{ color: '#000', textAlign: 'center' }}>{text1}</Text>
    </View>
  ),
};

export const showToast = (message: string) => {
  Toast.show({
    type: 'info',
    text1: message,
  });
};
