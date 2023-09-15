export type ProductPrice = {
  sellerValue: number;
  finalValue?: number;
  currency: string;
};

export type Product = {
  id?: string;
  price: ProductPrice;
  title: string;
  description?: string;
  quantityTotal: number;
  quantityAvailable: number;
  quantityUnit: string;
  sellerId?: string;
  image?: string;
  isListed?: boolean;
};
