import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationContainer from './src/navigation';
import { persistor, store } from './src/redux/store';

const STRIPE_KEY =
  'pk_test_51NhcqkBf6uI5vbOWl9BxsZMb6VXuJMOrJpLYwKBJzlkqRw7V14fapmtAVktveK3PCai7mfyct21MvPOWdLmRnAQz00U7j6uUSv';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <NavigationContainer />
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

export default React.memo(App);
