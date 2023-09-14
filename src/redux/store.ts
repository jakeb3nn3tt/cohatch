import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import productsReducer, { ProductsReducer } from './reducers/products';
import stripeInfoReducer, { StripeInfoReducer } from './reducers/stripeInfo';
import userReducer, { UserReducer } from './reducers/user';

const persistConfig = {
  key: 'community-hatch-app-redux',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  stripeInfo: stripeInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export type RootState = {
  user: UserReducer;
  products: ProductsReducer;
  stripeInfo: StripeInfoReducer;
};

export { persistor, store };
