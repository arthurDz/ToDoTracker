import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import Badge from '../Badge';
import {getValueFromAsyncStorage} from '../../utils/AsyncStorageHelper';
import ENVIRONMENT from '../../utils/Environment';
import axios from 'axios';
import TodoList from './TodoList';

const TodoListNavigator = ({addedTodo}) => {
  const Tab = createMaterialTopTabNavigator();
  const [todoList, setTodoList] = useState([]);

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
        setTodoList(res?.data?.todos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('addedTodo', addedTodo);
    getTodos();
  }, [addedTodo]);

  const TotalCount = {
    all: todoList.length,
    open: todoList.filter(t => t.status === 'open').length,
    closed: todoList.filter(t => t.status === 'closed').length,
    deleted: todoList.filter(t => t.status === 'deleted').length,
  };

  const MyTopTabBar = ({state, descriptors, navigation}) => {
    return (
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        className="mx-5 pb-5">
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
                style={{fontSize: 16}}>
                {label}
              </Text>
              <Badge
                badgeClasses={`${
                  isFocused
                    ? 'bg-blue-500'
                    : 'bg-transparent border-2 border-white'
                }`}
                label={TotalCount[route.name]}
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
        tabBar={props => <MyTopTabBar {...props} />}
        sceneContainerStyle={{backgroundColor: 'transparent'}}>
        <Tab.Screen name="all">
          {props => <TodoList {...props} data={todoList} status="all" />}
        </Tab.Screen>
        <Tab.Screen name="open">
          {props => <TodoList {...props} data={todoList} status="open" />}
        </Tab.Screen>
        <Tab.Screen name="closed">
          {props => <TodoList {...props} data={todoList} status="closed" />}
        </Tab.Screen>
        <Tab.Screen name="deleted">
          {props => <TodoList {...props} data={todoList} status="deleted" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default memo(TodoListNavigator);
