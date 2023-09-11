import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        paymentText: {
          marginTop: 20,
          marginBottom: 10,
          fontWeight: 'bold',
          fontSize: 18,
        },
      }),
    [],
  );
  return styles;
};
