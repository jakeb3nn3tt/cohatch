import { clearUser } from '../redux/reducers/user';
import { store } from '../redux/store';
import { signOut } from '../services/firebase/users';

export const signOutUser = async () => {
  await signOut();
  store.dispatch(clearUser(null));
};
