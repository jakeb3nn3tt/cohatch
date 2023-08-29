import React from 'react';
import {
  Modal as RNModal,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useStyles } from './styles';

type Props = {
  visible: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
};

const Modal = ({ visible, children, contentStyle, style, onClose }: Props) => {
  const styles = useStyles();
  return (
    <RNModal animationType="slide" transparent visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.container, style]}>
          <TouchableWithoutFeedback>
            <View style={[styles.contentContainer, contentStyle]}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default React.memo(Modal);
