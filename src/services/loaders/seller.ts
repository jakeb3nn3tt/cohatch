import { Product } from '../../types/product';
import {
  ActivityType,
  NotificationType,
  SellerActions,
} from '../../types/seller-data';

export const loadSellerNotificationAndActivity = async () => {
  // const user = store.getState().user as User;
  // const sellerNotificaitons = await fetchSellerNotifications({ userId: user.id });
  // const sellerActivity = await fetchSellerActivity({ userId: user.id });
  // store.dispatch(setNotificationData(sellerNotificaitons));
  // store.dispatch(setActivityData(sellerActivity));
};

export const loadSellerProducts = async () => {
  // const user = store.getState().user as User;
  // const sellerProducts = await fetchSellerProducts({ userId: user.id });
  // store.dispatch(setSellerProducts(sellerProducts));
  return [
    {
      id: 'N9A0V2B3UGB20',
      title: 'Eggs',
      price: {
        sellerValue: 6,
        currency: 'USD',
      },
      quantityAvailable: 10,
      quantityTotal: 10,
      quantityUnit: 'dozen',
      isListed: true,
      image: 'IMAGE_URL',
    },
  ] as Product[];
};

export const loadSellerNotification = async () => {
  return [
    {
      id: 'DMFANOEINAONEOGF',
      date: Date.now(),
      title: 'User123 just botught 10 eggs',
      message: 'Should be delivered at 54 Easy St.',
    },
  ] as NotificationType[];
};

export const loadSellerActivity = async () => {
  return [
    {
      id: 'MBS094GNAPNGI3NAK',
      date: Date.now(),
      action: SellerActions.LIST_ITEM_TO_SELL,
    },
  ] as ActivityType[];
};
