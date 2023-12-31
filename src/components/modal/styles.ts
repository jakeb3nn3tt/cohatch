import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SHADOW } from '../../constants';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2,
        },
        contentContainer: {
          width: '90%',
          backgroundColor: '#FFF',
          borderRadius: 20,
          padding: 20,
          paddingHorizontal: 15,
          ...SHADOW,
        },
      }),
    [],
  );
  return styles;
};
