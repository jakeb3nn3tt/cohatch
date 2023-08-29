import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 10,
        },
        titleText: {
          paddingLeft: 10,
          marginBottom: 5,
        },
        contentContainer: {
          backgroundColor: '#DDD',
          paddingHorizontal: 10,
          borderRadius: 10,
        },
      }),
    [],
  );
  return styles;
};
