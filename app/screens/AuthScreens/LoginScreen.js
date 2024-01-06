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
import React, {useState} from 'react';
import AuthTemplate from './AuthTemplate';
import Logo from '../../../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import InputField from '../../components/InputField';
import colors from 'tailwindcss/colors';
import Button from '../../components/Button';

const LoginScreen = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [hidden, setHidden] = useState(true);

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
  return (
    <AuthTemplate>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView className="flex-1" behavior="padding">
          <Image source={Logo} style={styles.logo} />
          <Text className="text-4xl text-black font-bold self-center">
            TodoTracker
          </Text>
          <Text className="text-sm text-gray-500 self-center">
            Welcome Back to your personal task tracker
          </Text>

          <InputField
            placeholder="Email"
            value={user?.email}
            onChangeText={val => handleInputField('email', val)}
            leftIcon={
              <AntDesign name="mail" size={25} color={colors.gray[300]} />
            }
            inputClassName="shadow-2xl mt-[4vh] bg-white w-[90vw]"
          />
          <InputField
            placeholder="Password"
            secureTextEntry={hidden}
            value={user?.password}
            onChangeText={val => handleInputField('password', val)}
            leftIcon={
              <AntDesign name="lock1" size={25} color={colors.gray[300]} />
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => setHidden(!hidden)}
                activeOpacity={0.5}>
                <Feather
                  name={hidden ? 'eye' : 'eye-off'}
                  size={25}
                  color={colors.gray[300]}
                />
              </TouchableOpacity>
            }
            inputClassName="shadow-xl mt-[4vh] bg-white w-[90vw]"
          />

          <Button btnClassName="mt-[10vh]">
            <Text className="font-medium text-lg text-white uppercase">
              Login
            </Text>
          </Button>
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
