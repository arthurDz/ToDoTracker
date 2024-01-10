import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import moment from 'moment';
import {BottomModal} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';
import colors from 'tailwindcss/colors';
import {generateRandomColor, getRandomColorPair} from '../../utils/AppUtil';
import Feather from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import Button from '../Button';
import axios from 'axios';
import ENVIRONMENT from '../../utils/Environment';
import {getValueFromAsyncStorage} from '../../utils/AsyncStorageHelper';
import Toast from 'react-native-toast-message';

const tags = ['work', 'personal', 'wishlist', 'meeting'];

const CreateTodoModal = ({
  setAddTodoModalVisible,
  addTodoModalVisible,
  setAddedTodo,
}) => {
  const [categories, setCategories] = useState(tags);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addCategoryInput, setAddCategoryInput] = useState('');
  const [newTodo, setNewTodo] = useState({
    title: '',
    category: '',
    dueDate: new Date(),
    description: '',
  });
  const [newCategory, setNewCategory] = useState('');
  const [showDueDateModal, setShowDueDateModal] = useState(false);

  const addTodoHandler = async () => {
    const token = await getValueFromAsyncStorage('TOKEN');
    setNewTodo({...newTodo, category: selectedCategory});
    try {
      const res = await axios.post(
        ENVIRONMENT.BASE_URL + 'todos/addTodo',
        newTodo,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNewTodo({
        title: '',
        category: '',
        dueDate: new Date(),
        description: '',
      });
      setSelectedCategory('');
      setAddTodoModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Todo added successfully',
      });
      setAddedTodo(res?.data?.todo);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'OOps!! Please try again',
      });
      console.log(error);
    }
  };

  const addCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
      setAddCategoryInput(false);
    }
  };

  const colorMap = useMemo(() => {
    const colors = {};
    categories.forEach(c => {
      colors[c] = generateRandomColor();
    });
    return colors;
  }, [categories]);

  const memoizedCategories = useMemo(
    () =>
      categories.map((c, i) => {
        const bgColor = colorMap[c];
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory(c);
            }}
            activeOpacity={0.7}
            key={i}
            style={{
              backgroundColor: bgColor,
              borderWidth: selectedCategory === c ? 3 : 0,
              borderColor: colors.white,
            }}
            className="rounded-lg py-2 px-5 items-center justify-center">
            <Text className="capitalize text-lg text-white">{c}</Text>
          </TouchableOpacity>
        );
      }),
    [categories, selectedCategory],
  );
  return (
    <>
      <BottomModal
        onSwipeOut={() => setAddTodoModalVisible(!addTodoModalVisible)}
        rounded={true}
        onBackdropPress={() => setAddTodoModalVisible(!addTodoModalVisible)}
        onHardwareBackPress={() => setAddTodoModalVisible(!addTodoModalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalTitle={<View className="h-[2] w-7 bg-white self-center mt-3" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={addTodoModalVisible}
        onTouchOutside={() => setAddTodoModalVisible(!addTodoModalVisible)}
        modalStyle={{backgroundColor: colors.blue[500], borderRadius: 40}}
        footer={
          <View style={{paddingHorizontal: 16, paddingBottom: 12}}>
            <Button
              onPress={addTodoHandler}
              btnClassName="bg-white"
              btnStyle={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 24,
              }}>
              <Text className="text-blue-500 text-lg font-semibold">
                Create Todo
              </Text>
            </Button>
          </View>
        }>
        <ModalContent
          style={{
            width: '100%',
            height: Dimensions.get('window').height - 240,
            paddingHorizontal: 16,
          }}>
          <TextInput
            placeholder="What do you need to do?"
            placeholderTextColor={colors.blue[400]}
            className="text-2xl text-white max-h-[100]"
            multiline
            numberOfLines={2}
            maxLength={70}
            value={newTodo?.title}
            onChangeText={text => setNewTodo({...newTodo, title: text})}
            autoFocus
          />

          {<View></View>}

          <View className="flex-row flex-wrap gap-3 mt-5">
            {memoizedCategories}
            {addCategoryInput ? (
              <View className="flex-row items-center">
                <TextInput
                  placeholder="Category"
                  placeholderTextColor={colors.blue[400]}
                  className="text-md text-white"
                  maxLength={20}
                  value={newCategory}
                  onChangeText={text => setNewCategory(text)}
                  onBlur={addCategory}
                  onSubmitEditing={addCategory}
                  autoFocus
                />
                <Text
                  className="rounded-full w-5 h-5 ml-4 bg-white text-red-500 text-center"
                  onPress={() => setAddCategoryInput(false)}>
                  X
                </Text>
              </View>
            ) : (
              <Text
                className="bg-blue-300 rounded-lg text-3xl py-1 px-4 text-white"
                onPress={() => setAddCategoryInput(true)}>
                +
              </Text>
            )}
          </View>

          <View className="mt-5">
            <Text className="text-xl text-white font-semibold mb-2 border-b-blue-200 border-b-2 w-1/3">
              Task Detail
            </Text>

            <View className="flex-row items-center">
              <Feather size={16} color={colors.blue[300]} name="clock" />
              <Text
                className="text-lg text-white ml-2"
                onPress={() => setShowDueDateModal(true)}>
                {moment(newTodo?.dueDate).format('dddd, MMM d, (hh:mm a)')}
              </Text>
            </View>

            <View className="flex-row items-start">
              <Feather
                size={16}
                color={colors.blue[300]}
                name="file-text"
                style={{marginTop: 15}}
              />
              <TextInput
                placeholder="Description"
                placeholderTextColor={colors.blue[300]}
                className="text-lg text-white ml-2 w-[85vw]"
                multiline
                numberOfLines={2}
                maxLength={75}
                value={newTodo?.description}
                onChangeText={text =>
                  setNewTodo({...newTodo, description: text})
                }
                textAlignVertical="top"
              />
            </View>
          </View>
        </ModalContent>
      </BottomModal>

      <DatePicker
        open={showDueDateModal}
        modal
        mode="datetime"
        date={newTodo?.dueDate}
        onConfirm={date => {
          setShowDueDateModal(false);
          setNewTodo({...newTodo, dueDate: date});
        }}
        onCancel={() => {
          setShowDueDateModal(false);
        }}
        title={'Todo Due Date'}
      />
    </>
  );
};

export default memo(CreateTodoModal);
