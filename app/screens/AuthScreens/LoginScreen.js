import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthTemplate from './AuthTemplate';
import Logo from '../../../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import InputField from '../../components/InputField';
import colors from 'tailwindcss/colors';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import ENVIRONMENT from '../../utils/Environment';
import Toast from 'react-native-toast-message';
import {
  getValueFromAsyncStorage,
  setValueInAsyncStorage,
} from '../../utils/AsyncStorageHelper';

const LoginScreen = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [hidden, setHidden] = useState(true);
  const navigation = useNavigation();

  const handleInputField = (type, value) => {
    switch (type) {
      case 'email':
        setUser({...user, [type]: value});
        break;
      case 'password':
        setUser({...user, [type]: value});
        break;
      default:
        break;
    }
  };

  const handleLogin = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    axios
      .post(ENVIRONMENT.BASE_URL + 'auth/login', user, {
        headers: headers,
      })
      .then(res => {
        const {token, user} = res.data;
        setValueInAsyncStorage('TOKEN', token);
        Toast.show({
          type: 'success',
          text1: 'Login successful',
          text2: `💥Welcome Back, ${user?.name}!💥`,
        });
        setUser({
          email: '',
          password: '',
        });
        navigation.reset({index: 0, routes: [{name: 'Tabs'}]});
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: 'An error has ocurred while Logging in',
        });
        console.log('Error', err);
      });
  };
  return (
    <AuthTemplate>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <Image source={Logo} style={styles.logo} />
          <Text className="text-4xl text-blue-900 font-bold self-center">
            TodoTracker
          </Text>
          <Text className="text-sm text-blue-200 self-center">
            Welcome Back to your personal task tracker
          </Text>

          <InputField
            placeholder="Email"
            value={user?.email}
            onChangeText={val => handleInputField('email', val)}
            leftIcon={
              <AntDesign name="mail" size={25} color={colors.blue[900]} />
            }
            inputClassName="shadow-2xl mt-[4vh] bg-blue-400 w-[90vw]"
          />
          <InputField
            placeholder="Password"
            secureTextEntry={hidden}
            value={user?.password}
            onChangeText={val => handleInputField('password', val)}
            leftIcon={
              <AntDesign name="lock1" size={25} color={colors.blue[900]} />
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => setHidden(!hidden)}
                activeOpacity={0.5}>
                <Feather
                  name={hidden ? 'eye' : 'eye-off'}
                  size={25}
                  color={colors.blue[900]}
                />
              </TouchableOpacity>
            }
            inputClassName="shadow-xl mt-[4vh] bg-blue-400 w-[90vw]"
          />

          <Button btnClassName="mt-[4vh] bg-blue-900" onPress={handleLogin}>
            <Text className="font-medium text-lg text-blue-400 uppercase">
              Login
            </Text>
          </Button>

          <View className="flex-row items-center self-center mt-5">
            <Text className="text-lg text-gray-400">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="text-lg text-blue-400 font-semibold ml-1">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </AuthTemplate>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
