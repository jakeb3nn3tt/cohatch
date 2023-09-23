import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { CustomerStackParamList } from '../../navigation/routes';
import { useStyles } from './styles';

const MapLayover = () => {
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<CustomerStackParamList, 'MAP'>>();

  return (
    <>
      <SafeAreaView style={styles.topContainer}>
        <View style={styles.contentContainer}>
          <Button
            title="Orders"
            onPress={() => navigation.navigate('CUSTOMER_ORDERS_STACK')}
          />
        </View>
        <View style={styles.contentContainer}>
          <Button title="Seach" onPress={() => navigation.navigate('SEARCH')} />
        </View>
        <View style={styles.contentContainer}>
          <Button
            title="Settings"
            onPress={() => navigation.navigate('CUSTOMER_SETTINGS_STACK')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default React.memo(MapLayover);
