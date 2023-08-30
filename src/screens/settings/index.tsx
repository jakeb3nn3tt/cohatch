import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { useSelector } from 'react-redux';
import MenuItem from '../../components/menu-item';
import Screen from '../../components/screen';
import Section from '../../components/section';
import Text from '../../components/text';
import {
  CustomerSettingsStackParamList,
  SellerSettingsStackParamList,
} from '../../navigation/routes';
import { RootState } from '../../redux/store';
import { UserRole } from '../../types/user';
import { signOutUser } from '../../utils/user';

type Props = NativeStackScreenProps<
  CustomerSettingsStackParamList & SellerSettingsStackParamList,
  'SETTINGS'
>;

const Settings = ({ navigation }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const isSeller = user?.role === UserRole.SELLER;

  const onSignOut = async () => {
    setLoading(true);
    try {
      await signOutUser();
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <Screen>
      <Text>Settings</Text>
      <View>
        {isSeller && (
          <>
            <Section>
              <MenuItem title="Bank Information" />
            </Section>
          </>
        )}
        {!isSeller && (
          <>
            <Section>
              <MenuItem
                title="Credit Cards"
                onPress={() => navigation.navigate('CREDIT_CARD_INFORMATION')}
              />
            </Section>
          </>
        )}
      </View>
      <Button title="Logout" onPress={onSignOut} disabled={loading} />
    </Screen>
  );
};

export default React.memo(Settings);
