import {View, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Button, Text} from 'react-native-paper';

const AuthScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View className="flex-1 justify-center space-y-24">
      <View className="items-center">
        <Text variant="displaySmall">CafeConnect</Text>
        <View>
          <Image
            source={{
              uri: '', // logo image can be used here
            }}
            style={{
              width: 190,
              height: 190,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
      <View className="items-center space-y-4">
        <Button
          mode="contained"
          className="w-40"
          onPress={() => navigation.navigate('Login')}>
          VENDOR
        </Button>
        <Button
          className="w-40"
          mode="contained"
          onPress={() => navigation.navigate('Login')}>
          EMPLOYEE
        </Button>
      </View>
    </View>
  );
};

export default AuthScreen;
