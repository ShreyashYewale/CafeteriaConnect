import {View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Button, Text, Image} from '@rneui/themed';

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
        <Text
          h2
          h2Style={{
            fontFamily: 'Nunito-SemiBold',
            fontWeight: '300',
          }}>
          CafeConnect
        </Text>
        <View>
          <Image
            source={{
              uri: '', // logo image can be used here
            }}
            containerStyle={{
              width: 190,
              height: 190,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
      <View className="items-center space-y-4">
        <View>
          <Button
            title="VENDOR"
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
            }}
            titleStyle={{fontWeight: 'bold', fontFamily: 'Nunito-SemiBold'}}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View>
          <Button
            title="EMPLOYEE"
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
            }}
            titleStyle={{fontWeight: 'bold', fontFamily: 'Nunito-SemiBold'}}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
