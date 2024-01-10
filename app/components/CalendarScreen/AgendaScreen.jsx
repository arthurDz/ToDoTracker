import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import colors from 'tailwindcss/colors';
import Colors from '../../utils/Colors';
import {getValueFromAsyncStorage} from '../../utils/AsyncStorageHelper';
import axios from 'axios';
import ENVIRONMENT from '../../utils/Environment';
import CalendarTodo from './CalendarTodo';
import RefreshAnimation from '../../utils/AppUtil';

const AgendaScreen = () => {
  const [items, setItems] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  useEffect(() => {
    getTodosHandler(moment().format('YYYY-MM-DD'));
  }, []);

  const getTodosHandler = async date => {
    const token = await getValueFromAsyncStorage('TOKEN');
    try {
      const res = await axios.get(ENVIRONMENT.BASE_URL + `todos/${date}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data) {
        setItems(res?.data?.todos);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={{height: Dimensions.get('screen').height - 110}}>
      <Agenda
        items={items}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={reservation => <CalendarTodo todo={reservation} />}
        renderEmptyData={() => {
          return (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-3xl font-semibold">
                {isLoading ? 'Loading Todos' : 'No Todos for this date'}
              </Text>
              <RefreshAnimation
                style={{
                  width: 200,
                  height: 180,
                  objectFit: 'cover',
                }}
                name={isLoading ? 'loadingAnimation' : 'refreshAnimation2'}
              />
            </View>
          );
        }}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        theme={{
          agendaKnobColor: colors.blue[700],
          calendarBackground: Colors['brand-washedBlue'],
          reservationsBackgroundColor: '#101C2E',
        }}
        onDayPress={day => {
          setIsLoading(true);
          getTodosHandler(day.dateString);
        }}
      />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
