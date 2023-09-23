/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import MapLayover from '../../components/map-layover';
import SaleComponent from '../../components/sale';
import { CustomerStackParamList } from '../../navigation/routes';
import { RootState } from '../../redux/store';
import { fetchNearSales } from '../../services/firebase/products';
import { Sale } from '../../types/sale';

type Props = NativeStackScreenProps<CustomerStackParamList, 'MAP'>;

const Map = ({ navigation }: Props): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState<Sale[]>([]);
  const userLocation = user?.address?.location;

  if (!userLocation) {
    navigation.reset('CUSTOMER_SETTINGS_STACK', { screen: 'MY_LOCATION' });
  }

  const loadProducts = async () => {
    setLoading(true);
    try {
      const nearSales = await fetchNearSales();
      setSales(nearSales);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        onDoublePress={() => console.log('double press')}
        initialRegion={{
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        style={{ flex: 1 }}>
        <Marker coordinate={userLocation} zIndex={100} />
        {sales.map(sale => {
          const sellerLocation = sale.seller.address?.location;
          if (!sellerLocation) {
            return null;
          }
          return (
            <Marker coordinate={sellerLocation} zIndex={100}>
              <SaleComponent sale={sale} />
            </Marker>
          );
        })}
      </MapView>
      <MapLayover />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default React.memo(Map);
