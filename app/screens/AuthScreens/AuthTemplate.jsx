import {SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';

const AuthTemplate = ({children}) => {
  return (
    <SafeAreaView className="flex-1 items-center bg-slate-50">
      {children}
    </SafeAreaView>
  );
};

export default AuthTemplate;
