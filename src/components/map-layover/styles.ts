import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  // const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        logoutContainer: {
          position: 'absolute',
          right: 10,
          top: 40,
          backgroundColor: '#FFF',
          padding: 10,
        },
      }),
    [],
  );
  return styles;
};
