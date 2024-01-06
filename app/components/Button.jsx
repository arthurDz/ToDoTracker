import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({btnClassName, children}) => {
  return (
    <TouchableOpacity
      className={`w-full items-center justify-center bg-blue-500 rounded-lg shadow-xl shadow-blue-300 py-4 mt-5 ${btnClassName}`}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
