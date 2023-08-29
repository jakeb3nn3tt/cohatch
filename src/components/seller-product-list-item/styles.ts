import { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const useStyles = () => {
  // const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingRight: 5,
          paddingBottom: 5,
          borderRadius: 5,
          borderWidth: 1,
          marginBottom: 10,
        },
        headerContainer: {
          flexDirection: 'row',
        },
        leftContentHeader: {
          flex: 1,
        },
        title: {
          fontWeight: 'bold',
          fontSize: 16,
          textAlign: 'center',
        },
        quantityContainer: {
          borderWidth: 1,
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 3,
          padding: 2,
        },
        quantityText: {
          fontWeight: 'bold',
          textAlign: 'center',
        },
        quantityCountContainer: {
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-around',
        },
        unitText: {
          textAlign: 'center',
        },
        image: {
          width: screenWidth / 3,
          height: 100,
        },
        priceContainer: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        priceText: {
          fontWeight: 'bold',
        },
        footerContainer: {
          flexDirection: 'row',
        },
      }),
    [],
  );
  return styles;
};
