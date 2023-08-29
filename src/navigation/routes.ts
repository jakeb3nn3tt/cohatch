import { Product } from '../types/product';

export type CostumerStackParamList = {
  HOME_COSTUMER: undefined;
  MAP: undefined;
  CHECKOUT: undefined;
  PAYMENT_SCREEN: undefined;
};

export type SellerBottomTabParamList = {
  SELLER_FEED: undefined;
  SELLER_PRODUCTS: undefined;
};

export type LoginStackParamList = {
  LOGIN: undefined;
  SELLER_SIGNUP: undefined;
  COSTUMER_SIGNUP: undefined;
};

export type SellerProductsStackParamList = {
  SELLER_PRODUCTS_LIST: undefined;
  SELLER_NEW_PRODUCT: { product?: Product };
};
