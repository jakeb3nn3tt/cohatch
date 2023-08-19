import { NavigationContainer as NC } from '@react-navigation/native';
import * as React from 'react';
import EntryPoint from '../screens/entry-point';

const NavigationContainer = () => {
  return (
    <NC>
      <EntryPoint />
    </NC>
  );
};

export default NavigationContainer;
