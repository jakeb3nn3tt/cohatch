import { clearProducts } from '../redux/reducers/products';
import { clearSales } from '../redux/reducers/sales';
import { clearStripeInfo } from '../redux/reducers/stripeInfo';
import { clearUser } from '../redux/reducers/user';
import { store } from '../redux/store';
import { signOut } from '../services/firebase/users';

export const signOutUser = async () => {
  await signOut();
  store.dispatch(clearUser(null));
  store.dispatch(clearProducts(null));
  store.dispatch(clearSales(null));
  store.dispatch(clearStripeInfo(null));
};
