import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {formatTodoDueDate, generateLighterShade} from '../../utils/AppUtil';
import colors from 'tailwindcss/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TodoCard = ({todo, index}) => {
  const [isCompleted, setIsCompleted] = useState(todo.status === 'completed');
  const color_pallete = [
    'orange',
    'amber',
    'yellow',
    'emerald',
    'teal',
    'cyan',
  ];
  const mappedColors = color_pallete.map(color => colors[color][300]);
  const bgColor = mappedColors[Math.floor(Math.random() * mappedColors.length)];
  const mappedCheckboxColors = color_pallete.map(color => colors[color][200]);
  const checkboxColor =
    mappedCheckboxColors[
      Math.floor(Math.random() * mappedCheckboxColors.length)
    ];
  return (
    <View
      className=" flex-row items-start px-5 py-3 rounded-2xl justify-between mb-5 mx-5"
      style={{backgroundColor: bgColor}}>
      <View className="w-2/3">
        <Text className="text-black text-3xl">{todo?.title}</Text>
        {todo?.description && (
          <Text className="text-black text-sm">{todo?.description}</Text>
        )}
      </View>
      <View className="items-end">
        <Text className="text-black text-sm mb-5">
          {formatTodoDueDate(todo?.dueDate)}
        </Text>
        <BouncyCheckbox
          onPress={isChecked => setIsCompleted(isChecked)}
          unfillColor="transparent"
          fillColor={checkboxColor}
          // iconStyle={{borderWidth: 3}}
          innerIconStyle={{borderWidth: 3}}
          size={30}
        />
      </View>
    </View>
  );
};

export default TodoCard;
