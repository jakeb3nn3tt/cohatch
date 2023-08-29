import firestore from '@react-native-firebase/firestore';
import { store } from '../../../redux/store';
import { Product } from '../../../types/product';
import { removeUndefined } from '../../../utils/products';
import { FetchSellerProductsQuery } from './types';

const productsCollection = firestore().collection('products');

export const fetchSellerProducts = async ({
  sellerId,
}: FetchSellerProductsQuery) => {
  const productsQuery = productsCollection.where('sellerId', '==', sellerId);
  const productsSnapshot = await productsQuery.get();
  return productsSnapshot.docs.map(doc => doc.data() as Product);
};

export const saveProduct = async (product: Product) => {
  const productToSave = removeUndefined(product) as Product;
  const doc = productsCollection.doc(productToSave.id);
  productToSave.id = doc.id;
  await doc.set(productToSave);
  return doc.id;
};

export const addNewProduct = async (product: Product) => {
  const userId = store.getState().user?.id;
  if (!userId) {
    throw new Error('No user logged in');
  }
  product.sellerId = userId;
  const docId = await saveProduct(product);
  return docId;
};
