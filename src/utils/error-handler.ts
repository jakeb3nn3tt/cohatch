// import Toast from 'react-native-toast-message';

export class KnownError {
  code: string;
  message?: string;
  subCode?: string;
  constructor(code: string, message?: string, subCode?: string) {
    this.code = code;
    this.message = message;
    this.subCode = subCode;
  }
}

export const getErrorMessage = (error: any) => {
  const ERROR_MAP: { [key: string]: string } = {
    // FIREBASE
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
  if (error instanceof KnownError && error.message) {
    toastMessage = error.message;
  } else {
    const errorMessage = getErrorMessage(error);
    if (errorMessage) {
      toastMessage = errorMessage;
    }
  }
  console.log('toastMessage', toastMessage);
  // Toast.show({
  //   type: 'info',
  //   text1: toastMessage,
  // });
};
