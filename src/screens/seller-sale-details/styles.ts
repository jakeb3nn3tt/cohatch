import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SHADOW } from '../../constants';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        sectionHeader: {
          margin: 5,
          fontSize: 14,
          fontWeight: 'bold',
        },
        productContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFF',
          padding: 10,
          margin: 5,
          borderRadius: 5,
          ...SHADOW,
        },
      }),
    [],
  );
  return styles;
};
