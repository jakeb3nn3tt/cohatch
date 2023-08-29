import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
        },
        valueIconContainer: {
          flexDirection: 'row',
        },
        goalIcon: {
          justifyContent: 'center',
          marginLeft: 10,
        },
        titleText: {
          fontSize: 18,
        },
        value: {
          color: '#555',
          fontSize: 18,
        },
      }),
    [],
  );
  return styles;
};
