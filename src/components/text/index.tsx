import React from 'react';
import { TextProps, Text as TextRN } from 'react-native';

const Text = ({ children, style, ...props }: TextProps) => {
  return (
    <TextRN style={[style]} {...props}>
      {children}
    </TextRN>
  );
};

export default React.memo(Text);
