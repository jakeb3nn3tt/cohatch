import functions from '@react-native-firebase/functions';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Linking, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Screen from '../../components/screen';
import Text from '../../components/text';
import { setStripeInfo } from '../../redux/reducers/stripeInfo';
import { stripeInfoSnapshot } from '../../services/firebase/stripe';
import { handleError } from '../../utils/error-handler';
import { signOutUser } from '../../utils/user';

const getStripeAccountLink = functions().httpsCallable('getStripeAccountLink');

type Props = {
  accountId?: string;
  onFinish: () => void;
};

const StripeLoader = ({ accountId, onFinish }: Props) => {
  const [accountLink, setAccountLink] = useState<string | undefined>();
  const dispatch = useDispatch();

  const onGetStripeAccountLink = useCallback(async () => {
    if (accountId) {
      try {
        const { data: link } = await getStripeAccountLink({ accountId });
        if (await Linking.canOpenURL(link)) {
          setAccountLink(link);
          setTimeout(() => {
            Linking.openURL(link);
          }, 3000);
        }
      } catch (error) {
        handleError(error);
      }
    }
  }, [accountId]);

  useEffect(() => {
    onGetStripeAccountLink();
  }, [onGetStripeAccountLink]);

  useEffect(() => {
    if (accountId) {
      const unsubscribe = stripeInfoSnapshot(accountId, snapshot => {
        const data = snapshot.data();
        if (data?.details_submitted) {
          onFinish();
          dispatch(setStripeInfo(data));
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [accountId, dispatch, onFinish]);

  const onSignOut = async () => {
    await signOutUser();
    onFinish();
  };

  return (
    <Screen>
      <Text>Loading Stripe...</Text>
      <Text>You need to complete the stripe setup in order to continue</Text>
      {accountLink && (
        <View style={{ flexDirection: 'row' }}>
          <Text>If a web page didn't open automatically click</Text>
          <TouchableOpacity onPress={() => Linking.openURL(accountLink)}>
            <Text style={{ color: 'blue' }}> here </Text>
          </TouchableOpacity>
          <Text>to open it</Text>
        </View>
      )}
      <Button title="Logout" onPress={onSignOut} />
    </Screen>
  );
};

export default React.memo(StripeLoader);
