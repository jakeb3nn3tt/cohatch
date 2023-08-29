import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  // const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        listedContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }),
    [],
  );
  return styles;
};
