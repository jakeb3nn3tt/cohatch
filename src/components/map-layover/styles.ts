import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  // const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        topContainer: {
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        },
        contentContainer: {
          backgroundColor: '#FFF',
          padding: 2,
          borderRadius: 10,
        },
      }),
    [],
  );
  return styles;
};
