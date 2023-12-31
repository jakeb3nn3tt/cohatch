import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import LoadingScreen from '../../components/loading-screen';
import CustomerStack from '../../navigation/customer-stack';
import LoginStack from '../../navigation/login-stack';
import SellerTabs from '../../navigation/seller-tabs';
import { RootState } from '../../redux/store';
import { saveUserFCMToken } from '../../services/firebase/users';
import { initialCustomerLoader } from '../../services/loaders/customer';
import { initialSellerLoader } from '../../services/loaders/seller';
import { checkPaymentInfo } from '../../services/loaders/stripe-seller';
import { UserRole } from '../../types/user';
import StripeLoader from '../stripe-loader';

const EntryPoint = () => {
  const user = useSelector((state: RootState) => state.user);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const loadingContent = loadingUser || loadingStripe;

  const userLoader = useCallback(async () => {
    if (user) {
      if (user?.role === UserRole.SELLER) {
        await checkPaymentInfo(user.stripeId, () => setLoadingStripe(true));
        await initialSellerLoader();
      } else {
        await initialCustomerLoader();
      }
    }
    setLoadingUser(false);
  }, [user]);

  useEffect(() => {
    userLoader();
  }, [userLoader]);

  // notifications
  useEffect(() => {
    messaging()
      .requestPermission()
      .then(permission => {
        console.log('permission', permission, messaging.AuthorizationStatus);
        const enabled =
          permission === messaging.AuthorizationStatus.AUTHORIZED ||
          permission === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          if (Platform.OS === 'ios') {
            messaging()
              .registerDeviceForRemoteMessages()
              .then(() => {
                messaging().getToken().then(saveUserFCMToken);
              });
          } else {
            messaging().getToken().then(saveUserFCMToken);
          }
        }
      })
      .catch(error => {
        console.log('error', error);
      });

    // // FOREGROUND STATE
    const unsubscribeOnMessage = messaging().onMessage(remoteMessage => {
      notifee.displayNotification({
        title: remoteMessage.notification?.title,
      });
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, [user]);

  if (loadingStripe && user) {
    return (
      <StripeLoader
        accountId={user.stripeId}
        onFinish={() => setLoadingStripe(false)}
      />
    );
  }

  if (loadingContent) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginStack />;
  }
  if (user.role === UserRole.CUSTOMER) {
    return <CustomerStack />;
  }
  return <SellerTabs />;
};

export default React.memo(EntryPoint);
