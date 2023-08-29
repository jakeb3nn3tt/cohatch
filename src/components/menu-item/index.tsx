import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../text';
import { useStyles } from './styles';

type Props = {
  title: string;
  value?: string | number;
  onPress?: () => void;
};

const MenuItem = ({ title, value, onPress }: Props) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.valueIconContainer}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {onPress ? (
          <View style={styles.goalIcon}>
            <Text>{'>'}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MenuItem);
