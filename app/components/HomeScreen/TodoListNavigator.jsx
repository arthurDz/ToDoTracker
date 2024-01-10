import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import Badge from '../Badge';
import {getValueFromAsyncStorage} from '../../utils/AsyncStorageHelper';
import ENVIRONMENT from '../../utils/Environment';
import axios from 'axios';
import TodoList from './TodoList';
import colors from 'tailwindcss/colors';

const TodoListNavigator = ({addedTodo, setAddedTodo}) => {
  const Tab = createMaterialTopTabNavigator();
  const [todoList, setTodoList] = useState([]);
  const [totalCount, setTotalCount] = useState({
    all: 0,
    open: 0,
    completed: 0,
    deleted: 0,
  });

  const getTodos = async () => {
    const token = await getValueFromAsyncStorage('TOKEN');
    try {
      const res = await axios.get(ENVIRONMENT.BASE_URL + 'todos', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data) {
        let all = res?.data?.todos.filter(t => t.status !== 'deleted').length;
        let open = res?.data?.todos.filter(t => t.status === 'open').length;
        let completed = res?.data?.todos.filter(
          t => t.status === 'completed',
        ).length;
        let deleted = res?.data?.todos.filter(
          t => t.status === 'deleted',
        ).length;

        // let compPer = Math.round((Number(completed) / Number(all)) * 100);
        setTodoList(res?.data?.todos);
        setTotalCount({
          all: all,
          open: open,
          completed: completed,
          deleted: deleted,
        });
        // setCompletedTaskPer(compPer);
        setAddedTodo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, [addedTodo]);

  const MyTopTabBar = ({state, descriptors, navigation}) => {
    return (
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        className="mx-2 pb-5">
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className={`flex-row items-center border-white ${
                isFocused ? 'border-b-2' : ''
              } pb-2 mx-1 justify-between`}>
              <Text
                className={`${
                  isFocused ? 'text-blue-500' : 'text-slate-50'
                } capitalize mr-1`}
                style={{fontSize: 14}}>
                {label}
              </Text>
              <Badge
                badgeClasses={`${
                  isFocused
                    ? 'bg-white'
                    : 'bg-transparent border-2 border-white'
                }`}
                label={totalCount[route.name]}
                labelClasses={isFocused ? 'text-black' : 'text-white'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        tabBar={props => <MyTopTabBar {...props} />}
        sceneContainerStyle={{
          backgroundColor: colors.blue[900],
          height: Dimensions.get('screen').height - 290,
        }}>
        <Tab.Screen name="all">
          {props => (
            <TodoList
              {...props}
              data={todoList}
              status="all"
              setAddedTodo={setAddedTodo}
              setTodoList={setTodoList}
              setTotalCount={setTotalCount}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="open">
          {props => (
            <TodoList
              {...props}
              data={todoList}
              status="open"
              setAddedTodo={setAddedTodo}
              setTodoList={setTodoList}
              setTotalCount={setTotalCount}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="completed">
          {props => (
            <TodoList
              {...props}
              data={todoList}
              status="completed"
              setAddedTodo={setAddedTodo}
              setTodoList={setTodoList}
              setTotalCount={setTotalCount}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="deleted">
          {props => (
            <TodoList
              {...props}
              data={todoList}
              status="deleted"
              setAddedTodo={setAddedTodo}
              setTodoList={setTodoList}
              setTotalCount={setTotalCount}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TodoListNavigator;
