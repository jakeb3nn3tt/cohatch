import { setProducts } from '../../redux/reducers/products';
import { setSales } from '../../redux/reducers/sales';
import { store } from '../../redux/store';
import {
  ActivityType,
  NotificationType,
  SellerActions,
} from '../../types/seller-data';
import { User } from '../../types/user';
import { fetchSellerProducts } from '../firebase/products';
import { fetchSellerSales } from '../firebase/sales';

export const loadSellerProducts = async () => {
  const user = store.getState().user as User;
  const sellerProducts = await fetchSellerProducts({ sellerId: user.id });
  store.dispatch(setProducts(sellerProducts));
};

export const loadSellerSales = async () => {
  const user = store.getState().user as User;
  const sellerSales = await fetchSellerSales({ sellerId: user.id });
  store.dispatch(setSales(sellerSales));
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
  await loadSellerSales();
  await loadSellerProducts();
};
