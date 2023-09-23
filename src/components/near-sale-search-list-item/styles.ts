import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: 10,
          backgroundColor: '#FFF',
          borderWidth: 1,
          borderColor: '#AAA',
          borderRadius: 10,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        productContainer: {
          flexDirection: 'row',
        },
        image: {
          width: 80,
          height: 70,
        },
      }),
    [],
  );
  return styles;
};
