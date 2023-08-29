import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        cardFieldContainer: {
          width: '100%',
          height: 50,
          marginVertical: 10,
          backgroundColor: '#EAEAEA',
        },
        modalView: {
          width: '100%',
        },
      }),
    [],
  );
  return styles;
};
