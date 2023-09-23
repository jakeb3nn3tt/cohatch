import { setProducts } from '../../redux/reducers/products';
import { setSales } from '../../redux/reducers/sales';
import { store } from '../../redux/store';
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

export const initialSellerLoader = async () => {
  await loadSellerSales();
  await loadSellerProducts();
};
