import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const stripCollection = firestore().collection('stripeInfo');

export const getStripeAccountInformation = async (accountId: string) => {
  const snapshot = await stripCollection.doc(accountId).get();
  return snapshot.data();
};

export const stripeInfoSnapshot = (
  accountId: string,
  cb: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => void,
) => stripCollection.doc(accountId).onSnapshot(cb);
