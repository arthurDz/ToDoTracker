import AsyncStorage from '@react-native-async-storage/async-storage';

// Method to get a value from AsyncStorage
export const getValueFromAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error retrieving data from AsyncStorage:', error);
    return null;
  }
};

// Method to set a value in AsyncStorage
export const setValueInAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log('Error saving data to AsyncStorage:', error);
  }
};

// Method to delete a value from AsyncStorage
export const deleteValueFromAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error deleting data from AsyncStorage:', error);
  }
};
