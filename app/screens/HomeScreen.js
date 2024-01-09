import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Button from '../components/Button';
import TodoListNavigator from '../components/HomeScreen/TodoListNavigator';
import CreateTodoModal from '../components/HomeScreen/CreateTodoModal';
import {getValueFromAsyncStorage} from '../utils/AsyncStorageHelper';
import axios from 'axios';
import ENVIRONMENT from '../utils/Environment';
// Todo = Another screen where user can upload image and we will implement shared transition as well

// const {CalendarModule} = NativeModules;

// [
//   {
//     id: 1,
//     title: 'Client Feedback',
//     description: 'Need to take feedback from FB client',
//     status: 'open',
//     priority: 'high',
//   },
//   {
//     id: 2,
//     title: 'Client Feedback',
//     description: 'Need to take feedback from FB client',
//     status: 'closed',
//     priority: 'medium',
//   },
//   {
//     id: 3,
//     title: 'Client Feedback',
//     description: 'Need to take feedback from FB client',
//     status: 'deleted',
//     priority: 'low',
//   },
//   {
//     id: 4,
//     title: 'Client Feedback',
//     description: 'Need to take feedback from FB client',
//     status: 'open',
//     priority: 'none',
//   },
// ]

const HomeScreen = () => {
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const [addedTodo, setAddedTodo] = useState(null);

  const handleAddTodo = () => {
    setAddTodoModalVisible(true);
  };

  return (
    <View className="bg-[#101C2E] flex-1">
      {/* Header */}
      <View className="my-[4vh] flex-row items-center justify-between px-[5vw]">
        <View>
          <Text className="font-bold text-[3vh] text-white">
            Today's {moment().format('dddd')}
          </Text>
          <Text className="text-lg text-gray-400">
            {moment(new Date()).format('MMM DD, YYYY')}
          </Text>
        </View>

        <Button
          btnClassName="w-[35vw] bg-green-500 py-2"
          onPress={handleAddTodo}>
          <Text className="capitalize text-white font-semibold text-lg">
            Add task +
          </Text>
        </Button>
      </View>

      {/* Todo Top Navigator */}
      <TodoListNavigator addedTodo={addedTodo} />

      <CreateTodoModal
        addTodoModalVisible={addTodoModalVisible}
        setAddTodoModalVisible={setAddTodoModalVisible}
        setAddedTodo={setAddedTodo}
      />
    </View>
  );
};

export default HomeScreen;
