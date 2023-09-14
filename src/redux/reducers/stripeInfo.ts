import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

export type StripeInfoReducer = any | null;

const initialState: StripeInfoReducer = null;

export const stripeInfoSlice = createSlice<
  StripeInfoReducer,
  SliceCaseReducers<StripeInfoReducer>,
  'stripeInfo'
>({
  name: 'stripeInfo',
  initialState,
  reducers: {
    setStripeInfo: (state, action: PayloadAction<any>) => action.payload,
    clearStripeInfo: () => null,
  },
});

export const { setStripeInfo, clearStripeInfo } = stripeInfoSlice.actions;

export default stripeInfoSlice.reducer;
