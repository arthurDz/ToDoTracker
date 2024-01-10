import {PanResponder, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import TodoCard from './TodoCard';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import refreshIcon from '../../../assets/images/refreshIcon.png';
import RefreshAnimation from '../../utils/AppUtil';
import {getValueFromAsyncStorage} from '../../utils/AsyncStorageHelper';
import ENVIRONMENT from '../../utils/Environment';
import axios from 'axios';

const TodoList = props => {
  const [refreshing, setRefreshing] = useState(false);

  const {setTotalCount, setTodoList, setAddedTodo} = props;
  const AnimatedFlashlist = Animated.createAnimatedComponent(FlashList);
  const data =
    props.status === 'all'
      ? props.data.filter(t => t.status !== 'deleted')
      : props.data.filter(t => t.status === props.status);

  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value * 1.5,
    };
  });

  const refreshIconStyles = useAnimatedStyle(() => {
    const scale = Math.min(1, Math.max(0, pullDownPosition.value / 75));

    return {
      opacity: refreshing
        ? withTiming(0, {duration: 20})
        : Math.max(0, pullDownPosition.value - 25) / 50,
      transform: [
        {
          scaleX: refreshing ? withTiming(0.15, {duration: 120}) : scale,
        },
        {
          scaleY: scale,
        },
        {
          rotate: `${pullDownPosition.value * 3}deg`,
        },
      ],
      backgroundColor: 'transparent',
    };
  }, [refreshing]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const getTodos = async done => {
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
        console.log(all);
        let open = res?.data?.todos.filter(t => t.status === 'open').length;
        let completed = res?.data?.todos.filter(
          t => t.status === 'completed',
        ).length;
        let deleted = res?.data?.todos.filter(
          t => t.status === 'deleted',
        ).length;

        setTodoList(res?.data?.todos);
        setTotalCount({
          all: all,
          open: open,
          completed: completed,
          deleted: deleted,
        });
        setAddedTodo(null);
        setTimeout(() => {
          setRefreshing(false);
          done();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = done => {
    setRefreshing(true);
    getTodos(done);
  };

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 75 : 0, {
      duration: 180,
    });

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;

      // A function that resets the animation
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {duration: 180});
      };

      // trigger the refresh action
      onRefresh(onRefreshComplete);
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy >= 0,
      onPanResponderMove: (event, gestureState) => {
        const maxDistance = 80;
        pullDownPosition.value = Math.max(
          Math.min(maxDistance, gestureState.dy),
          0,
        );
        if (
          pullDownPosition.value >= maxDistance / 2 &&
          isReadyToRefresh.value === false
        ) {
          isReadyToRefresh.value = true;
        }

        if (
          pullDownPosition.value < maxDistance / 2 &&
          isReadyToRefresh.value === true
        ) {
          isReadyToRefresh.value = false;
        }
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );

  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });

  return (
    <View style={{flex: 1}} pointerEvents={refreshing ? 'none' : 'auto'}>
      <Animated.View
        style={[
          refreshContainerStyles,
          {
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
          },
        ]}>
        {refreshing && (
          <RefreshAnimation
            style={{
              width: 200,
              height: 180,
              objectFit: 'cover',
              position: 'absolute',
              bottom: -70,
            }}
          />
        )}

        <Animated.Image
          source={refreshIcon}
          style={[refreshIconStyles, {height: 50, width: 50}]}
        />
      </Animated.View>
      <Animated.View
        style={[
          pullDownStyles,
          {backgroundColor: '#101C2E', flex: 1, paddingTop: 12},
        ]}
        {...panResponderRef.current.panHandlers}>
        <AnimatedFlashlist
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <TodoCard todo={item} setAddedTodo={setAddedTodo} />
          )}
          estimatedItemSize={200}
          overScrollMode="never"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        />
      </Animated.View>
    </View>
  );
};

export default TodoList;
