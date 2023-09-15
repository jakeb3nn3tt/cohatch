import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { Sale } from '../../types/sale';

export type SalesReducer = Sale[];

const initialState: SalesReducer = [];

export const SalesSlice = createSlice<
  SalesReducer,
  SliceCaseReducers<SalesReducer>,
  'sale'
>({
  name: 'sale',
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<Sale[]>) => action.payload,
    clearSales: () => [],
  },
});

export const { setSales, clearSales } = SalesSlice.actions;

export default SalesSlice.reducer;
