import { Product } from '../types/product';
import { Sale } from '../types/sale';

export type CustomerStackParamList = {
  HOME_COSTUMER: undefined;
  MAP: undefined;
  CHECKOUT: undefined;
  PAYMENT_SCREEN: { sale: Sale };
  COSTUMER_SETTINGS_STACK: undefined;
  COSTUMER_ORDERS_STACK: undefined;
};

export type SellerBottomTabParamList = {
  SELLER_SALES: undefined;
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

export type SellerSalesStackParamList = {
  SELLER_SALES: undefined;
  SELLER_SALE_DETAILS: { sale: Sale };
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

export type CustomerOrdersStackParamList = {
  CUSTOMER_ORDERS: undefined;
  CUSTOMER_ORDER_DETAILS: { sale: Sale };
};
