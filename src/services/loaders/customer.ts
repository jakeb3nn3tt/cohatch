import { setNearSales } from '../../redux/reducers/near-sales';
import { setSales } from '../../redux/reducers/sales';
import { store } from '../../redux/store';
import { User } from '../../types/user';
import { fetchNearSales } from '../firebase/products';
import { fetchCustomerOders } from '../firebase/sales';

export const loadCustomerOrders = async () => {
  const user = store.getState().user as User;
  const customerOrders = await fetchCustomerOders({ customerId: user.id });
  store.dispatch(setSales(customerOrders));
};

export const loadNearSales = async () => {
  const nearSales = await fetchNearSales();
  store.dispatch(setNearSales(nearSales));
};

export const initialCustomerLoader = async () => {
  await loadCustomerOrders();
  await loadNearSales();
};
