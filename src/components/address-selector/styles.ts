import { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('screen').height * 0.7;
const width = Dimensions.get('screen').width * 0.8;

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height,
          width,
        },
        mapContainer: {
          flex: 1,
        },
      }),
    [],
  );
  return styles;
};
