import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 10,
        },
        searchInput: {
          backgroundColor: '#FFF',
          borderWidth: 1,
          borderColor: '#CCC',
          borderRadius: 10,
          padding: 10,
        },
      }),
    [],
  );
  return styles;
};
