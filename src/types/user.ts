export enum UserRole {
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
  DEVELIVERY_PERSON = 'DEVELIVERY_PERSON',
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
  customerStripeId: string;
  sellerStripeId: string;
  email: string;
  password: string;
  role?: UserRole;
  name?: string;
  address?: UserAddress;
  notificationToken?: UserAddress;
};
