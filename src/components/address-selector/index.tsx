import React, { useState } from 'react';
import { Button, View } from 'react-native';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { UserAddress, UserLocation } from '../../types/user';
import Input from '../input';
import Text from '../text';
import { useStyles } from './styles';

Geocoder.init(Config.GEOCODER_API_KEY || '');

type Props = {
  currentAddress?: UserAddress;
  onChange: (address: UserAddress) => void;
};

const AddressSelector = ({ currentAddress, onChange }: Props) => {
  const [formattedAddress, setFormattedAddress] = useState(
    currentAddress?.address || '',
  );
  const [address, setAddress] = useState(currentAddress?.address || '');
  const [marker, setMarker] = useState<UserLocation | undefined>(
    currentAddress?.location,
  );
  const [loading, setLoading] = useState(false);
  const styles = useStyles();

  const onFindAddress = async () => {
    setLoading(true);
    try {
      const result = await Geocoder.from(address);
      if (result.results?.[0]?.geometry.location) {
        const data = result.results?.[0];
        const newFormattedAddress = data?.formatted_address;
        const location = data?.geometry.location;
        const newMarker = {
          latitude: location.lat,
          longitude: location.lng,
        };
        setMarker(newMarker);
        setAddress(newFormattedAddress);
        setFormattedAddress(newFormattedAddress);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const onMapPress = async (event: MapPressEvent) => {
    setLoading(true);
    try {
      const location = event.nativeEvent.coordinate;
      const result = await Geocoder.from(location);
      const newFormattedAddress = result.results?.[0]?.formatted_address;
      if (newFormattedAddress) {
        setMarker(location);
        setAddress(newFormattedAddress);
        setFormattedAddress(newFormattedAddress);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const onConfirmAddress = () => {
    onChange({
      address: formattedAddress,
      location: marker,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Enter your address by tapping on the map or typing an address</Text>
      <Input label="Address" onChangeText={setAddress} value={address} />
      <Button title="Find address" onPress={onFindAddress} />
      <MapView
        onPress={onMapPress}
        style={styles.mapContainer}
        region={
          marker
            ? {
                latitude: marker.latitude,
                longitude: marker.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : undefined
        }>
        {marker && <Marker coordinate={marker} zIndex={100} />}
      </MapView>
      <Button title="Confirm Address" onPress={onConfirmAddress} />
    </View>
  );
};

export default React.memo(AddressSelector);
