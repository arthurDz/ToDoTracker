import {View, Text} from 'react-native';
import React from 'react';

const Badge = ({label = '', labelClasses = '', badgeClasses = ''}) => {
  return (
    <View
      className={`rounded-xl py-[1] px-[10] justify-center items-center ${badgeClasses}`}>
      <Text className={`text-xs text-white ${labelClasses}`}>{label}</Text>
    </View>
  );
};

export default Badge;
