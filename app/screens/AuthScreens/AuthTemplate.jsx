import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';

const AuthTemplate = ({children}) => {
  return (
    <SafeAreaView className="flex-1 items-center bg-[#101C2E]">
      <StatusBar backgroundColor={Colors['brand-bg']} />
      {children}
    </SafeAreaView>
  );
};

export default AuthTemplate;
