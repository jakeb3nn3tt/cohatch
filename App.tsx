import { StripeProvider } from '@stripe/stripe-react-native';
import React from 'react';
import NavigationContainer from './src/navigation';

const STRIPE_KEY =
  'pk_test_51NhcqkBf6uI5vbOWl9BxsZMb6VXuJMOrJpLYwKBJzlkqRw7V14fapmtAVktveK3PCai7mfyct21MvPOWdLmRnAQz00U7j6uUSv';

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <NavigationContainer />
    </StripeProvider>
  );
};

export default React.memo(App);
