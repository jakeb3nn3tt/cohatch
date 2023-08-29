import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { useStyles } from './styles';

type Props = TextInputProps & {
  label?: string;
  inputStyle?: StyleProp<TextStyle>;
};

const Input = React.forwardRef(
  (
    { style, label, inputStyle, placeholderTextColor, ...props }: Props,
    ref: React.ForwardedRef<TextInput>,
  ) => {
    const styles = useStyles();
    return (
      <View style={style}>
        {label && <Text>{label}</Text>}
        <TextInput
          {...props}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, inputStyle]}
          ref={ref}
        />
      </View>
    );
  },
);

export default React.memo(Input);
