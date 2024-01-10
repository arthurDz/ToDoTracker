import {View} from 'react-native';
import React from 'react';
import AgendaScreen from '../components/CalendarScreen/AgendaScreen';

const CalenderScreen = () => {
  return (
    <View className="bg-[#101C2E] flex-1">
      <AgendaScreen />
    </View>
  );
};

export default CalenderScreen;
