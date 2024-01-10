import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import colors from 'tailwindcss/colors';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

const CalendarTodo = ({todo}) => {
  /* UI color logic */
  const color_pallete = [
    'orange',
    'amber',
    'yellow',
    'emerald',
    'teal',
    'cyan',
    'purple',
    'violet',
    'indigo',
  ];

  const mappedColors = color_pallete.map(color => colors[color][300]);
  //   const bgColor = mappedColors[Math.floor(Math.random() * mappedColors.length)];
  const memoizedBgColor = useMemo(() => {
    return mappedColors[Math.floor(Math.random() * mappedColors.length)];
  }, []);
  const mappedTimeColors = color_pallete.map(color => colors[color][500]);
  const memoizedTimeColor = useMemo(() => {
    return mappedTimeColors[
      Math.floor(Math.random() * mappedTimeColors.length)
    ];
  });
  /* UI color logic */
  return (
    <View
      style={{backgroundColor: memoizedBgColor}}
      className="rounded-3xl px-5 py-2 mt-5 mr-2">
      <Text className="text-xl font-semibold text-blue-950">{todo?.title}</Text>
      <View
        className="flex-row items-center mt-2 rounded-xl py-1 w-1/3 justify-center"
        style={{backgroundColor: memoizedTimeColor}}>
        <Feather name="clock" size={20} color={colors.white} />
        <Text className="text-white ml-2">
          {moment(todo.dueDate).format('h:mm A')}
        </Text>
      </View>
    </View>
  );
};

export default CalendarTodo;
