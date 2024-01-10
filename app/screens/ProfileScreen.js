import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getValueFromAsyncStorage} from '../utils/AsyncStorageHelper';
import axios from 'axios';
import ENVIRONMENT from '../utils/Environment';
import colors from 'tailwindcss/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const getUser = async () => {
    const token = await getValueFromAsyncStorage('TOKEN');
    try {
      const res = await axios.get(ENVIRONMENT.BASE_URL + 'user/getUser', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data) {
        setUser(res.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logoutHandler = async () => {
    try {
      navigation.reset({index: 0, routes: [{name: 'Auth'}]});
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="bg-[#101C2E] flex-1 px-5">
      <View className="h-[20vh] items-center justify-center">
        <View className="bg-blue-400 rounded-full w-[7vh] h-[7vh] items-center justify-center">
          <Text className="text-blue-800 text-5xl">
            {user?.name.substring(0, 1)}
          </Text>
        </View>
      </View>

      <View className="h-[90vh]">
        <View className="h-1/2">
          <Text className="text-center text-2xl text-white mb-5">Profile</Text>
          <View
            className="flex-row items-center justify-between  px-4 py-3 rounded-xl mb-5"
            style={{backgroundColor: Colors['brand-washedBlue']}}>
            <View className="flex-row items-center">
              <Octicons name="person" color={colors.blue[900]} size={30} />
              <Text className="text-blue-900 text-lg ml-2">Username</Text>
            </View>
            <Text className="text-blue-100 text-lg ml-2 capitalize">
              {user?.name}
            </Text>
          </View>
          <View
            className="flex-row items-center justify-between  px-4 py-3 rounded-xl mb-5"
            style={{backgroundColor: Colors['brand-washedBlue']}}>
            <View className="flex-row items-center">
              <Octicons name="mail" color={colors.blue[900]} size={30} />
              <Text className="text-blue-900 text-lg ml-2">Email</Text>
            </View>
            <Text className="text-blue-100 text-lg ml-2">{user?.email}</Text>
          </View>
          <View
            className="flex-row items-center justify-between  px-4 py-3 rounded-xl mb-5"
            style={{backgroundColor: Colors['brand-washedBlue']}}>
            <View className="flex-row items-center">
              <Octicons name="lock" color={colors.blue[900]} size={30} />
              <Text className="text-blue-900 text-lg ml-2">Password</Text>
            </View>
            <Text className="text-blue-100 text-lg ml-2 capitalize">
              {user?.password}
            </Text>
          </View>
          <View
            className="flex-row items-center justify-between  px-4 py-3 rounded-xl"
            style={{backgroundColor: Colors['brand-washedBlue']}}>
            <View className="flex-row items-center">
              <MaterialIcons
                name="assignment"
                color={colors.blue[900]}
                size={30}
              />
              <Text className="text-blue-900 text-lg ml-2">Total Todos</Text>
            </View>
            <Text className="text-blue-100 text-lg ml-2 capitalize">
              {user?.todos.length}
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-center text-2xl text-white mb-5">Account</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={logoutHandler}
            className="flex-row items-center justify-between  px-4 py-3 rounded-xl mb-5"
            style={{backgroundColor: Colors['brand-washedBlue']}}>
            <Text className="text-blue-900 text-lg ml-2">Logout</Text>
            <MaterialIcons name="logout" color={colors.blue[100]} size={30} />
          </TouchableOpacity>
          <View
            className="flex-row items-center justify-between  px-4 py-3 rounded-xl mb-5"
            style={{backgroundColor: Colors['brand-washedBlue']}}>
            <Text className="text-rose-900 text-lg ml-2">
              Delete My Account
            </Text>
            <MaterialIcons
              name="delete-outline"
              color={colors.rose[900]}
              size={30}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
