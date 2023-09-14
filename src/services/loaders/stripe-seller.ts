import { setStripeInfo } from '../../redux/reducers/stripeInfo';
import { store } from '../../redux/store';
import { getStripeAccountInformation } from '../firebase/stripe';

export const checkPaymentInfo = async (
  accountId: string,
  onNotInitialized: () => void,
) => {
  try {
    const response = await getStripeAccountInformation(accountId);
    if (response?.details_submitted) {
      store.dispatch(setStripeInfo(response));
    } else {
      onNotInitialized();
    }
  } catch (error) {
    console.log('error', error);
  }
};
