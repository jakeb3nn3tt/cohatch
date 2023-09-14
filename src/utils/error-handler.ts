// import Toast from 'react-native-toast-message';

export class KnownError {
  code: string;
  message: string;
  description: string | boolean | undefined;
  constructor(code: string, message: string, description?: string | boolean) {
    this.code = code;
    this.message = message;
    if (description !== false) {
      if (typeof description === 'string') {
        this.description = description;
      } else {
        this.description =
          'Something went wrong. Please check your network connection and try again.';
      }
    }
  }
}

export const getFirebaseErrorMessage = (error: any) => {
  const ERROR_MAP: { [key: string]: string } = {
    'auth/email-already-exists': 'Email already exists.',
    'auth/invalid-email': 'Invalid email.',
    'auth/user-not-found': 'User not found.',
    'auth/wrong-password': 'Wrong password.',
    'auth/weak-password': 'Weak password.',
    'auth/email-already-in-use':
      'The email address is already in use by another account.',
  };
  return ERROR_MAP[error.code];
};

export const handleError = (error: any) => {
  console.log('error', error);
  let toastMessage =
    'Something went wrong. Please check your network connection and try again.';
  if (error instanceof KnownError) {
    toastMessage = error.message;
  }
  const firebaseMessage = getFirebaseErrorMessage(error);
  if (firebaseMessage) {
    toastMessage = firebaseMessage;
  }
  console.log('toastMessage', toastMessage);
  // Toast.show({
  //   type: 'info',
  //   text1: toastMessage,
  // });
};
