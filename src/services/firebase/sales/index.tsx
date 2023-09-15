import firestore from '@react-native-firebase/firestore';
import { Sale } from '../../../types/sale';
import { removeUndefined } from '../../../utils/products';
import { FetchSellerSalesQuery } from './types';

const salesCollection = firestore().collection('sales');

export const saveSale = async (sale: Sale) => {
  const saleToSave = removeUndefined(sale) as Sale;
  const doc = salesCollection.doc(saleToSave.id);
  saleToSave.id = doc.id;
  await doc.set(saleToSave);
  return doc.id;
};

export const fetchSellerSales = async ({ sellerId }: FetchSellerSalesQuery) => {
  const salesQuery = salesCollection.where('sellerId', '==', sellerId);
  const salesSnapshot = await salesQuery.get();
  return salesSnapshot.docs.map(doc => doc.data() as Sale);
};
