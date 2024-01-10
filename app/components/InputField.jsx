import {TextInput, View} from 'react-native';
import React from 'react';
import colors from 'tailwindcss/colors';

const InputField = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  leftIcon,
  rightComponent,
  inputClassName,
}) => {
  //   const inputClass = ;
  return (
    <View
      className={`px-2 items-center my-2 text-gray-300 flex-row rounded-md ${inputClassName}`}>
      {leftIcon && <View>{leftIcon}</View>}
      <TextInput
        style={{flex: 1}}
        placeholder={placeholder}
        placeholderTextColor={colors.blue[900]}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      {rightComponent && <View>{rightComponent}</View>}
    </View>
  );
};

export default InputField;

// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: Colors.singletons.white,
//     paddingHorizontal: setValueBasedOnWidth(16),
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: setValueBasedOnHeight(10),
//     borderRadius: 8,
//     color: Colors.singletons.gray,
//     flexDirection: 'row',
//   },
// });
