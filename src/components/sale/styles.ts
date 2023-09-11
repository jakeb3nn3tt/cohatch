import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: '#FFF',
          padding: 5,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#CCC',
        },
        saleTitle: {
          padding: 5,
          textAlign: 'center',
        },
        modalContainer: {
          width: 175,
          height: 200,
          marginBottom: 10,
        },
        modalImage: {
          width: 175,
          height: 100,
        },
        modalDetailsContainer: {
          padding: 10,
          backgroundColor: '#FFFF',
          flex: 1,
          borderWidth: 1,
          borderColor: '#CCC',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        },
        modalText: {
          fontSize: 8,
        },
        modalQuantityContainer: {
          fontSize: 8,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 99999,
        },
        modalQuantityText: {
          fontSize: 12,
        },
      }),
    [],
  );
  return styles;
};
