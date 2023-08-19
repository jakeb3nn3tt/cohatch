import React from 'react';
import { StatusBarStyle, StyleProp, ViewStyle } from 'react-native';

export type Props = {
  scroll?: boolean;
  horizontalScoll?: boolean;
  safeAreaStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  statusBarStyle?: StatusBarStyle;
  children?: React.ReactNode;
};
