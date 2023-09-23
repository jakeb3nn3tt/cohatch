import { Product } from './product';
import { User } from './user';

export type NearSale = {
  seller: User;
  products: Product[];
};
