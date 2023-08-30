import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
          borderWidth: 1,
          borderRadius: 3,
          padding: 5,
        },
      }),
    [],
  );
  return styles;
};
