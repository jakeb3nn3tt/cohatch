import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';

export enum UserRole {
  SELLER = 'SELLER',
  COSTUMER = 'COSTUMER',
}

export type CreditCard = Details;

export type User = {
  id: string;
  stripeId: string;
  email: string;
  password: string;
  role?: UserRole;
  name?: string;
  creditCards?: CreditCard[];
};
