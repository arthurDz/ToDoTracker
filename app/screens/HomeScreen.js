import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import Button from '../components/Button';
import TodoListNavigator from '../components/HomeScreen/TodoListNavigator';
import CreateTodoModal from '../components/HomeScreen/CreateTodoModal';

const HomeScreen = () => {
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const [addedTodo, setAddedTodo] = useState(null);

  const handleAddTodo = () => {
    setAddTodoModalVisible(true);
  };

  return (
    <View className="bg-[#101C2E] flex-1">
      <StatusBar backgroundColor={'#101C2E'} />
      {/* Header */}
      <View className="my-[4vh] flex-row items-center justify-between px-[5vw]">
        <View>
          <Text className="font-bold text-xl text-white">
            Today's {moment().format('dddd')}
          </Text>
          <Text className="text-md text-gray-400">
            {moment(new Date()).format('MMM DD, YYYY')}
          </Text>
        </View>

        <Button
          btnClassName="w-[35vw] bg-blue-500 py-2"
          onPress={handleAddTodo}>
          <Text className="capitalize text-white font-semibold text-lg">
            Add task +
          </Text>
        </Button>
      </View>

      {/* Todo Top Navigator */}
      <TodoListNavigator addedTodo={addedTodo} setAddedTodo={setAddedTodo} />

      <CreateTodoModal
        addTodoModalVisible={addTodoModalVisible}
        setAddTodoModalVisible={setAddTodoModalVisible}
        setAddedTodo={setAddedTodo}
      />
    </View>
  );
};

export default HomeScreen;
