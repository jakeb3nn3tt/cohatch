import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { store } from '../../../redux/store';
import { User, UserRole } from '../../../types/user';

const usersCollection = firestore().collection('users');

export const createNewAccount = async (
  email: string,
  name: string,
  password: string,
  role: UserRole,
) => {
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
  };
  await usersCollection.doc(id).set(newUser);
  // await deleteUserFCMToken();
  return { ...newUser, password };
};

export const getRandomUserId = () => {
  return usersCollection.doc().id;
};

export const saveUserFCMToken = (notificationToken?: string) => {
  const userId = store.getState().user?.id;
  if (notificationToken?.length && userId) {
    usersCollection.doc(userId).set({ notificationToken }, { merge: true });
  }
};

// export const deleteUserFCMToken = async () => {
//   try {
//     const userId = store.getState().user?.id;
//     if (userId) {
//       await usersCollection.doc(userId).update({
//         notificationToken: firestore.FieldValue.delete(),
//       });
//     }
//   } catch (error) {
//     // console.log('error', error);
//   }
// };

export const login = async (email: string, password: string) => {
  const signedInUser = await auth().signInWithEmailAndPassword(email, password);
  const id = signedInUser.user.uid;
  const userSnapshot = await usersCollection.doc(id).get();
  // await deleteUserFCMToken();
  return { ...userSnapshot.data(), password } as User;
};

export const signOutUser = async () => {
  try {
    // await deleteUserFCMToken();
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