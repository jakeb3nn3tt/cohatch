import { setProducts } from '../../redux/reducers/products';
import { store } from '../../redux/store';
import {
  ActivityType,
  NotificationType,
  SellerActions,
} from '../../types/seller-data';
import { User } from '../../types/user';
import { fetchSellerProducts } from '../firebase/products';

export const loadSellerNotificationAndActivity = async () => {
  // const user = store.getState().user as User;
  // const sellerNotificaitons = await fetchSellerNotifications({ userId: user.id });
  // const sellerActivity = await fetchSellerActivity({ userId: user.id });
  // store.dispatch(setNotificationData(sellerNotificaitons));
  // store.dispatch(setActivityData(sellerActivity));
};

export const loadSellerProducts = async () => {
  const user = store.getState().user as User;
  const sellerProducts = await fetchSellerProducts({ sellerId: user.id });
  store.dispatch(setProducts(sellerProducts));
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

export const initialSellerLoader = async () => {
  await loadSellerProducts();
};
