import _ from 'lodash';
import { clearUser } from '../redux/reducers/user';
import { store } from '../redux/store';
import { saveUser, signOut } from '../services/firebase/users';
import { CreditCard, User } from '../types/user';

export const signOutUser = async () => {
  await signOut();
  store.dispatch(clearUser(null));
};

export const addCreditCard = async (creditCard: CreditCard) => {
  const user = store.getState()?.user;
  const newUser = _.cloneDeep(user) as User;
  if (!newUser.creditCards?.length) {
    newUser.creditCards = [creditCard];
  } else {
    newUser.creditCards?.push(creditCard);
  }
  await saveUser(newUser);
};
