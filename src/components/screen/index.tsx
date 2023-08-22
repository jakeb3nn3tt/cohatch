import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { useStyles } from './styles';
import { Props } from './types';

const Screen = ({
  scroll,
  horizontalScoll,
  safeAreaStyle,
  style,
  statusBarStyle = 'dark-content',
  // headerComponent: Header,
  children,
}: Props) => {
  const isScroll = scroll || horizontalScoll;
  const ScreenComponent = isScroll ? ScrollView : View;
  const styles = useStyles();
  const screenStyle = {
    style: [styles.screenContainer, style],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={statusBarStyle} />
      <SafeAreaView style={[styles.container, safeAreaStyle]}>
        <ScreenComponent
          {...screenStyle}
          horizontal={horizontalScoll}
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {children}
          <View style={styles.marginComponent} />
        </ScreenComponent>
      </SafeAreaView>
    </View>
  );
};

export default React.memo(Screen);
