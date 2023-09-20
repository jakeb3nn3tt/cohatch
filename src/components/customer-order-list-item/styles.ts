import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SHADOW } from '../../constants';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: 10,
          padding: 10,
          backgroundColor: '#FFF',
          borderRadius: 8,
          ...SHADOW,
        },
        infoContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      }),
    [],
  );
  return styles;
};
