import {View, Button} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';

const AuthScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View className="flex-1 justify-center ">
      <View className="mb-3">
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
      <View>
        <Button
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

export default AuthScreen;
