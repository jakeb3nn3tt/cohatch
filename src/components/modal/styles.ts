import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

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
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        },
      }),
    [],
  );
  return styles;
};
