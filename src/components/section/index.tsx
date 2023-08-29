import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

const Section = ({ title, style, contentStyle, children }: Props) => {
  const styles = useStyles();
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={styles.titleText}>
          <Text>{title}</Text>
        </View>
      )}
      <View style={[styles.contentContainer, contentStyle]}>{children}</View>
    </View>
  );
};

export default React.memo(Section);
