import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import { CustomerStackParamList } from '../../navigation/routes';
import { useStyles } from './styles';

const MapLayover = () => {
  const styles = useStyles();
  const navigation =
    useNavigation<NavigationProp<CustomerStackParamList, 'MAP'>>();

  return (
    <>
      <View style={styles.logoutContainer}>
        <Button
          title="Settings"
          onPress={() => navigation.navigate('COSTUMER_SETTINGS_STACK')}
        />
      </View>
    </>
  );
};

export default React.memo(MapLayover);
