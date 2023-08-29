import React from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/reducers/user';
import { useStyles } from './styles';

const MapLayover = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(clearUser(null));
  };

  return (
    <>
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </>
  );
};

export default React.memo(MapLayover);
