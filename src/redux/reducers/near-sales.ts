import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { NearSale } from '../../types/near-sale';

export type NearSalesReducer = NearSale[];

const initialState: NearSalesReducer = [];

export const NearSalesSlice = createSlice<
  NearSalesReducer,
  SliceCaseReducers<NearSalesReducer>,
  'near-sale'
>({
  name: 'near-sale',
  initialState,
  reducers: {
    setNearSales: (state, action: PayloadAction<NearSale[]>) => action.payload,
    clearNearSales: () => [],
  },
});

export const { setNearSales, clearNearSales } = NearSalesSlice.actions;

export default NearSalesSlice.reducer;
