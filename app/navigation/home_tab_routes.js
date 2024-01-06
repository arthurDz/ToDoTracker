import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalenderScreen from '../screens/CalenderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'tailwindcss/colors';
import Colors from '../utils/Colors';
import {MotiView} from 'moti';

const HomeTabRoutes = () => {
  const Tab = createBottomTabNavigator();

  const RenderIcon = ({routeName, isFocused}) => {
    let name = {
      active: 'home',
      inactive: 'home-outline',
    };
    switch (routeName) {
      case 'Home':
        name.active = 'home';
        name.inactive = 'home-outline';
        break;
      case 'Calender':
        name.active = 'calendar';
        name.inactive = 'calendar-outline';
        break;
      case 'Profile':
        name.active = 'person-circle';
        name.inactive = 'person-circle-outline';
        break;
      default:
        name.active = 'person-circle';
        name.inactive = 'person-circle-outline';
        break;
    }
    return (
      <>
        {isFocused ? (
          <Ionicons name={name.active} size={16} color={colors.white} />
        ) : (
          <Ionicons
            name={name.inactive}
            size={16}
            color={Colors['Neutrals/neutrals-9']}
          />
        )}
      </>
    );
  };

  const MyTabBar = ({state, descriptors, navigation}) => {
    const [selectedTab, setSelectedTab] = useState(null);

    const handleTabPress = (index, route) => {
      setSelectedTab(prev => (prev === index ? null : index));
      navigation.navigate(route);
    };

    return (
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const showText = isFocused || selectedTab === index;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(index, route.name)}>
              <MotiView
                from={{width: 60}}
                animate={{
                  width: showText ? 130 : 60,
                }}
                transition={{
                  type: 'spring',
                  duration: 800,
                }}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isFocused
                      ? Colors['primary-blue-700']
                      : Colors['Neutrals/neutrals-1'],
                  },
                ]}>
                <RenderIcon routeName={route.name} isFocused={isFocused} />
                {isFocused && (
                  <MotiView
                    from={{opacity: 0, scale: 0}}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      type: 'spring',
                      duration: 800,
                    }}>
                    <Text style={styles.label}>{route.name}</Text>
                  </MotiView>
                )}
              </MotiView>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calender"
        component={CalenderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabRoutes;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors['brand-washedBlue'],
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
    borderRadius: 10,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  label: {
    color: Colors['Neutrals/neutrals-1'],
    fontSize: 14,
    marginLeft: 15,
  },
});
