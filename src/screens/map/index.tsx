/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Eggs from '../../assets/images/eggs.png';
import MapLayover from '../../components/map-layover';
import Text from '../../components/text';

const MyCustomMarker = () => {
  const [show, setShow] = useState(false);
  const [totalSelected, setTotalSelected] = useState(1);
  const quantityAvailable = 8;
  const price = 4.99;
  const navigation = useNavigation();

  const onToggleOpen = () => {
    setTotalSelected(1);
    setShow(prev => !prev);
  };

  const onChangeTotalSelected = (newChange: number) => {
    setTotalSelected(prev => {
      const newValue = prev + newChange;
      if (newValue > quantityAvailable || newValue < 0) {
        return prev;
      }
      return newValue;
    });
  };

  const onBuy = () => {
    navigation.navigate('PAYMENT_SCREEN');
    console.log('buy');
  };

  return (
    <View>
      {show && (
        <View
          style={{
            width: 175,
            height: 200,
            marginBottom: 10,
          }}>
          <Image source={Eggs} style={{ width: 175, height: 100 }} />
          <View
            style={{
              padding: 10,
              backgroundColor: '#FFFF',
              flex: 1,
              borderWidth: 1,
              borderColor: '#CCC',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text style={{ fontSize: 8 }}>I sell eggs</Text>
            <Text style={{ fontSize: 8 }}>Price: ${price} / dozen</Text>
            <Text style={{ fontSize: 8 }}>
              Quantity available: {quantityAvailable} dozens
            </Text>
            <View
              style={{
                fontSize: 8,
                flexDirection: 'row',
                alignItems: 'center',
                zIndex: 99999,
              }}>
              <Text style={{ fontSize: 8 }}>I want:</Text>
              <TouchableOpacity onPress={() => onChangeTotalSelected(-1)}>
                <Text style={{ fontSize: 8 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 12 }}>{totalSelected}</Text>
              <TouchableOpacity onPress={() => onChangeTotalSelected(1)}>
                <Text style={{ fontSize: 8 }}>+</Text>
              </TouchableOpacity>
            </View>
            <Button title="Buy" color="#000" onPress={onBuy} />
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={onToggleOpen}
        style={{
          backgroundColor: '#FFF',
          padding: 5,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#CCC',
        }}>
        <Text style={{ padding: 5, textAlign: 'center' }}>Eggs</Text>
      </TouchableOpacity>
    </View>
  );
};

const Map = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <MapView
        onDoublePress={() => console.log('double press')}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}>
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          zIndex={100}>
          <MyCustomMarker />
        </Marker>
        {/* <Circle
          center={{latitude: 37.78825, longitude: -122.4324}}
          radius={1600}
          fillColor="#00000011"
        /> */}
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
