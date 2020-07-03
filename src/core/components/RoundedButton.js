import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RoundedButtonStyles } from './styles';

const RoundedButton = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} style={RoundedButtonStyles.container} disabled={disabled}>
      <Text style={RoundedButtonStyles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
