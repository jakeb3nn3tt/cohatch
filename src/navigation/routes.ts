import { Product } from '../types/product';

export type CustomerStackParamList = {
  HOME_COSTUMER: undefined;
  MAP: undefined;
  CHECKOUT: undefined;
  PAYMENT_SCREEN: undefined;
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
};

export type CustomerSettingsStackParamList = {
  SETTINGS: undefined;
  CREDIT_CARD_INFORMATION: undefined;
};
