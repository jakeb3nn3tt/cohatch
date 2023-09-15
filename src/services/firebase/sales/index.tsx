import firestore from '@react-native-firebase/firestore';
import { Sale } from '../../../types/product';
import { removeUndefined } from '../../../utils/products';

const salesCollection = firestore().collection('sales');

export const createNewSale = async (sale: Sale) => {
  const saleToSave = removeUndefined(sale) as Sale;
  const doc = salesCollection.doc(saleToSave.id);
  saleToSave.id = doc.id;
  await doc.set(saleToSave);
  return doc.id;
};
