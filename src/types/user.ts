export enum UserRole {
  SELLER = 'SELLER',
  COSTUMER = 'COSTUMER',
}

export type UserLocation = {
  latitude: number;
  longitude: number;
};

export type UserAddress = {
  location?: UserLocation;
  address?: string;
};

export type PaymentMethod = {
  billing_details: {
    address: any;
    email: string;
    name: string;
    phone: string;
  };
  card: {
    brand: string;
    checks: any;
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: any;
    last4: string;
    networks: any;
    three_d_secure_usage: any;
    wallet: null;
  };
  created: number;
  customer: string;
  id: string;
  livemode: false;
  metadata: {};
  object: string;
  type: string;
};

export type User = {
  id: string;
  stripeId: string;
  email: string;
  password: string;
  role?: UserRole;
  name?: string;
  paymentMethods?: PaymentMethod;
  address?: UserAddress;
};
