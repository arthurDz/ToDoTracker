import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabRoutes from './home_tab_routes';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={HomeTabRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
