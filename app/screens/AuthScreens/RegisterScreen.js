import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const RegisterScreen = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [hidden, setHidden] = useState(true);
  const navigation = useNavigation();

  const handleInputField = (type, value) => {
    switch (type) {
      case 'name':
        setUser({...user, [type]: value});
        break;
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

  const handleRegister = async () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const data = {
      name: user?.name,
      email: user?.email,
      password: user?.password,
    };
    axios
      .post(ENVIRONMENT.BASE_URL + 'auth/register', data, {
        headers: headers,
      })
      .then(res => {
        console.log(res);
        Toast.show({
          type: 'success',
          text1: 'Registeration successful',
          text2: '💥You have been registered successfully!💥',
        });
        setUser({
          name: '',
          email: '',
          password: '',
        });
        navigation.navigate('Login');
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Registeration failed',
          text2: 'An error has ocurred while Registeration',
        });
        console.log('Error', err);
      });
  };
  return (
    <AuthTemplate>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView className="flex-1" behavior="position">
          <Image source={Logo} style={styles.logo} />
          <Text className="text-4xl text-blue-900 font-bold self-center">
            TodoTracker
          </Text>
          <Text className="text-sm text-blue-200 self-center">
            Let's Get Started
          </Text>

          <InputField
            placeholder="Name"
            value={user?.name}
            onChangeText={val => handleInputField('name', val)}
            leftIcon={
              <AntDesign name="user" size={25} color={colors.blue[900]} />
            }
            inputClassName="shadow-2xl mt-[4vh] bg-blue-400 w-[90vw]"
          />

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

          <Button btnClassName="mt-[4vh] bg-blue-900" onPress={handleRegister}>
            <Text className="font-medium text-lg text-blue-400 uppercase">
              Register
            </Text>
          </Button>

          <View className="flex-row items-center self-center mt-5">
            <Text className="text-lg text-blue-100">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-lg text-blue-400 font-semibold ml-1">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </AuthTemplate>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});
