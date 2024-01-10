import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getValueFromAsyncStorage} from '../utils/AsyncStorageHelper';
import axios from 'axios';
import ENVIRONMENT from '../utils/Environment';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

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
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView className="bg-[#101C2E] flex-1">
      <Text>ProfileScreen</Text>
    </ScrollView>
  );
};

export default ProfileScreen;
