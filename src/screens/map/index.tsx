import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import MapLayover from '../../components/map-layover';
import SaleComponent from '../../components/sale';
import { CustomerStackParamList } from '../../navigation/routes';
import { RootState } from '../../redux/store';
import { UserLocation } from '../../types/user';

type Props = NativeStackScreenProps<CustomerStackParamList, 'MAP'>;

const Map = ({ navigation }: Props): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const nearSales = useSelector((state: RootState) => state.nearSales);
  const userLocation = user?.address?.location;

  if (!userLocation) {
    navigation.reset('CUSTOMER_SETTINGS_STACK', { screen: 'MY_LOCATION' });
  }

  return (
    <View style={styles.container}>
      <MapView
        onDoublePress={() => console.log('double press')}
        initialRegion={{
          latitude: userLocation?.latitude as number,
          longitude: userLocation?.longitude as number,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        style={{ flex: 1 }}>
        <Marker coordinate={userLocation as UserLocation} zIndex={100} />
        {nearSales.map(sale => {
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
