import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export type ProductsReducer = Product[] | null;

const initialState: ProductsReducer = [];

export const productsSlice = createSlice<
  ProductsReducer,
  SliceCaseReducers<ProductsReducer>,
  'products'
>({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => action.payload,
    clearProducts: () => [],
  },
});

export const { setProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
