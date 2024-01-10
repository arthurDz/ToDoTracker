import {
  View,
  Text,
  PanResponder,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {formatTodoDueDate, generateLighterShade} from '../../utils/AppUtil';
import colors, {green, orange, violet} from 'tailwindcss/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import ENVIRONMENT from '../../utils/Environment';
import {getValueFromAsyncStorage} from '../../utils/AsyncStorageHelper';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const TodoCard = ({todo, setAddedTodo}) => {
  const [isCompleted, setIsCompleted] = useState(todo.status === 'completed');
  const [isDeleted, setIsDeleted] = useState(false);

  /* Card delete Animation logic */
  const offset = useSharedValue(0);
  const height = useSharedValue(150);
  const opacity = useSharedValue(1);

  const WIDTH = Dimensions.get('window').width;
  const threshold = -WIDTH * 0.4;

  const pan = Gesture.Pan()
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onEnd(event => {
      if (threshold > event.translationX) {
        offset.value = withSpring(-WIDTH);
        height.value = withTiming(0);
        opacity.value = withTiming(0);
        runOnJS(setIsDeleted)(true);
      } else {
        offset.value = withSpring(0);
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
    height: height.value,
    opacity: opacity.value,
    marginBottom: opacity.value === 1 ? 14 : 0,
  }));
  /* Card delete Animation logic */

  /* API and functional logic */
  useEffect(() => {
    if (isDeleted) deleteTodoHandler();
  }, [isDeleted]);

  const deleteTodoHandler = async () => {
    const token = await getValueFromAsyncStorage('TOKEN');
    try {
      const res = await axios.patch(
        ENVIRONMENT.BASE_URL + `todos/statusChange/${todo._id}`,
        {status: 'deleted'},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsDeleted(false);
      setAddedTodo(res?.data?.todo);
      Toast.show({
        type: 'success',
        text1: 'Todo deleted successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'OOps!! Please try again',
      });
      console.log(error);
    }
  };

  const markTodoCompletedHandler = async () => {
    if (todo?.status === 'completed') {
      return;
    }
    const token = await getValueFromAsyncStorage('TOKEN');
    try {
      const res = await axios.patch(
        ENVIRONMENT.BASE_URL + `todos/statusChange/${todo._id}`,
        {status: 'completed'},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsCompleted(true);
      Toast.show({
        type: 'success',
        text1: 'Todo marked as completed',
      });
      if (res?.data) setAddedTodo(res?.data?.todo);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Oops!! Please try again',
      });
      console.log(error);
    }
  };
  /* API and functional logic */

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            animatedStyles,
            {
              backgroundColor:
                todo?.status === 'completed'
                  ? colors.green[300]
                  : todo?.status === 'open'
                  ? colors.orange[300]
                  : colors.violet[300],
              flexDirection: 'row',
              paddingHorizontal: 12,
              paddingVertical: 12,
              justifyContent: 'space-between',
              marginHorizontal: 12,
              borderRadius: 15,
            },
          ]}>
          <View className="w-2/3">
            <Text
              className="text-black text-3xl h-1/3"
              style={{
                textDecorationLine:
                  todo?.status === 'completed' ? 'line-through' : 'none',
              }}>
              {todo?.title}
            </Text>
            {todo?.description && (
              <Text className="text-black text-sm">{todo?.description}</Text>
            )}
          </View>
          <View className="items-end">
            <Text className="text-black text-sm mb-5 h-1/3">
              {formatTodoDueDate(todo?.dueDate)}
            </Text>
            <BouncyCheckbox
              onPress={isChecked => {
                markTodoCompletedHandler();
              }}
              disabled={isCompleted}
              unfillColor="transparent"
              fillColor={
                todo?.status === 'completed'
                  ? colors.green[400]
                  : todo?.status === 'open'
                  ? colors.orange[400]
                  : colors.violet[400]
              }
              isChecked={isCompleted}
              innerIconStyle={{borderWidth: 3}}
              size={50}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default TodoCard;
