import { Product } from '../types/product';
import { User } from '../types/user';

export type CustomerStackParamList = {
  HOME_COSTUMER: undefined;
  MAP: undefined;
  CHECKOUT: undefined;
  PAYMENT_SCREEN: { product: Product; quantity: number; seller: User };
  COSTUMER_SETTINGS_STACK: undefined;
};

export type SellerBottomTabParamList = {
  SELLER_FEED: undefined;
  SELLER_PRODUCTS: undefined;
  SELLER_SETTINGS_STACK: undefined;
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

export type SellerSettingsStackParamList = {
  SETTINGS: undefined;
  MY_LOCATION: undefined;
};

export type CustomerSettingsStackParamList = {
  SETTINGS: undefined;
  CREDIT_CARD_INFORMATION: undefined;
  MY_LOCATION: undefined;
};
