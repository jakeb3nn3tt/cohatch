import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: 175,
          height: 200,
          marginBottom: 10,
        },
        image: {
          width: 175,
          height: 100,
        },
        detailsContainer: {
          padding: 10,
          backgroundColor: '#FFFF',
          flex: 1,
          borderWidth: 1,
          borderColor: '#CCC',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        },
        text: {
          fontSize: 8,
        },
        quantityContainer: {
          fontSize: 8,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 99999,
        },
        quantityText: {
          fontSize: 12,
        },
      }),
    [],
  );
  return styles;
};
