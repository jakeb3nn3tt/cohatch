import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  // const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          // backgroundColor: colors.backgroundPrimary
        },
        screenContainer: {
          flex: 1,
          // backgroundColor: colors.backgroundPrimary
        },
        // marginComponent: {
        //   height: TAB_BAR_HEIGHT
        // }
      }),
    [],
  );
  return styles;
};
