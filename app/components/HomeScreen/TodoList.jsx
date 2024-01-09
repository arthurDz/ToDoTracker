import {View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import TodoCard from './TodoCard';

const TodoList = props => {
  const data =
    props.status === 'all'
      ? props.data
      : props.data.filter(t => t.status === props.status);

  return (
    <View
      className="h-full bg-transparent"
      style={{backgroundColor: 'transparent'}}>
      <FlashList
        data={data}
        renderItem={({item, index}) => <TodoCard todo={item} index={index} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default TodoList;
