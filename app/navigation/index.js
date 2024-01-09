import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabRoutes from './home_tab_routes';
import AuthRoutes from './auth_routes';
import {getValueFromAsyncStorage} from '../utils/AsyncStorageHelper';
import {Text} from 'react-native';
import {useEffect, useState} from 'react';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getValueFromAsyncStorage('TOKEN');
        console.log(token);
        if (token) {
          setIsLogin(true);
        }
      } catch (error) {
        console.log('Error retrieving login status: ', error);
      }
      setIsLoading(false);
    };
    checkLoginStatus();
  }, [isLoading]);

  if (isLoading) {
    return <Text>isLoading</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? 'Tabs' : 'Auth'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthRoutes} />
        <Stack.Screen name="Tabs" component={HomeTabRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
