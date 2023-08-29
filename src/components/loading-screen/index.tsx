import React from 'react';
import { ActivityIndicator } from 'react-native';
import Screen from '../screen';
import { useStyles } from './styles';

const LoadingScreen = () => {
  const styles = useStyles();
  return (
    <Screen style={styles.container}>
      <ActivityIndicator size="large" />
    </Screen>
  );
};

export default React.memo(LoadingScreen);
