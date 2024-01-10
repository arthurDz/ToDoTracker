import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({
  btnClassName,
  children,
  onPress,
  activeOpacity = 0.7,
  btnStyle,
}) => {
  return (
    <TouchableOpacity
      style={{...btnStyle}}
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={`w-full items-center justify-center bg-blue-500 rounded-lg shadow-md shadow-blue-300 py-4 mt-5 ${btnClassName}`}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
