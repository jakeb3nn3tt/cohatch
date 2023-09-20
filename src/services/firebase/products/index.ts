import firestore from '@react-native-firebase/firestore';
import { store } from '../../../redux/store';
import { Product } from '../../../types/product';
import { User, UserRole } from '../../../types/user';
import { removeUndefined } from '../../../utils/products';
import { FetchSellerProductsQuery } from './types';

const productsCollection = firestore().collection('products');
const usersCollection = firestore().collection('users');

export const fetchSellerProducts = async ({
  sellerId,
}: FetchSellerProductsQuery) => {
  const productsQuery = productsCollection.where('sellerId', '==', sellerId);
  const productsSnapshot = await productsQuery.get();
  return productsSnapshot.docs.map(doc => doc.data() as Product);
};

export const fetchNearSales = async () => {
  const userLocation = store.getState()?.user?.address?.location;
  if (!userLocation) {
    throw new Error('User has no address');
  }
  const sellersQuery = usersCollection
    .where('role', '==', UserRole.SELLER)
    .where('address.location.latitude', '<=', userLocation.latitude + 1)
    .where('address.location.latitude', '>=', userLocation.latitude - 1);
  const sellerSnapshot = await sellersQuery.get();
  const sellersFiltered = sellerSnapshot.docs.filter(doc => {
    const seller = doc.data() as User;
    const sellerLongitude = seller.address?.location?.longitude;
    if (sellerLongitude === undefined) {
      return false;
    }
    return (
      sellerLongitude <= userLocation.longitude + 1 &&
      sellerLongitude >= userLocation.longitude - 1
    );
  });
  if (!sellersFiltered.length) {
    return [];
  }
  const sellersIds = sellersFiltered.map(u => u.id);
  // need to redo this query
  const productsSnapshot = await productsCollection
    .where('sellerId', 'in', sellersIds)
    .where('quantityAvailable', '>', 0)
    .get();
  const products = productsSnapshot.docs.map(doc => doc.data() as Product);
  return sellersFiltered.map(doc => {
    const seller = doc.data() as User;
    return {
      seller,
      products: products.filter(p => p.sellerId === seller.id),
    };
  });
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
