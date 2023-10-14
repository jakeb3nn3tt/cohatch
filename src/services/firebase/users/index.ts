import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { setUser } from '../../../redux/reducers/user';
import { store } from '../../../redux/store';
import { User, UserAddress, UserRole } from '../../../types/user';
import { removeUndefined } from '../../../utils/products';

const createStripeCustomer = functions().httpsCallable('createStripeCustomer');
const createStripeSeller = functions().httpsCallable('createStripeSeller');

const usersCollection = firestore().collection('users');

export const createNewAccount = async (
  email: string,
  name: string,
  password: string,
  role: UserRole,
  address: UserAddress,
) => {
  const { data } = await createStripeCustomer({ email, name });
  const customerStripeId = data;
  const newAuthUser = await auth().createUserWithEmailAndPassword(
    email,
    password,
  );
  const id = newAuthUser.user.uid;
  const newUser = {
    id,
    email,
    name,
    role,
    customerStripeId,
    address,
  };
  await usersCollection.doc(id).set(newUser);
  await deleteUserFCMToken();
  return { ...newUser, password };
};

export const activateSellerUser = async () => {
  const user = store.getState().user;
  const { data } = await createStripeSeller({ email: user?.email });
  const sellerStripeId = data;
  await usersCollection.doc(user?.id).update({ sellerStripeId });
};

export const getRandomUserId = () => {
  return usersCollection.doc().id;
};

export const saveUserFCMToken = (notificationToken?: string) => {
  const userId = store.getState().user?.id;
  if (notificationToken?.length && userId) {
    usersCollection.doc(userId).update({ notificationToken });
  }
};

export const deleteUserFCMToken = async () => {
  try {
    const userId = store.getState().user?.id;
    if (userId) {
      await usersCollection.doc(userId).update({
        notificationToken: firestore.FieldValue.delete(),
      });
    }
  } catch (error) {
    // console.log('error', error);
  }
};

export const login = async (email: string, password: string) => {
  const signedInUser = await auth().signInWithEmailAndPassword(email, password);
  const id = signedInUser.user.uid;
  const userSnapshot = await usersCollection.doc(id).get();
  await deleteUserFCMToken();
  return { ...userSnapshot.data(), password } as User;
};

export const signOut = async () => {
  try {
    await deleteUserFCMToken();
    await auth().signOut();
  } catch (error) {
    console.log('error', error);
  }
};

export const deleteUserAccount = async (user: User) => {
  const signedInUser = await auth().signInWithEmailAndPassword(
    user.email,
    user.password,
  );
  await signedInUser.user.delete();
  await usersCollection.doc(user.id).delete();
};

export const sendResetPasswordEmail = async (email: string) => {
  await auth().sendPasswordResetEmail(email);
};

export const saveUser = async (user: User, saveOnReducer = true) => {
  const password = user.password;
  user.password = '';
  await usersCollection.doc(user.id).set(removeUndefined(user));
  if (saveOnReducer) {
    store.dispatch(setUser({ ...user, password }));
  }
};

export const getUser = async (userId: string) => {
  const userSnapshot = await usersCollection.doc(userId).get();
  if (userSnapshot.exists) {
    return userSnapshot.data() as User;
  }
};
