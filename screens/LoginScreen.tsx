import {View, TextInput, Button} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {buttonClass, inputClass} from '../css-util';
import {RootStackParamList} from '../App';

const LoginScreen = () => {
  const {register, handleSubmit, setValue} = useForm();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onSubmit = useCallback((formData: any) => {
    console.log(formData, formData.username);
    navigation.navigate('Home');
  }, []);

  const onChangeField = useCallback(
    (name: string) => (text: string) => {
      setValue(name, text);
    },
    [],
  );

  useEffect(() => {
    register('username');
    register('password');
  }, [register]);

  return (
    <View className="flex-1 items-center justify-center p-2 space-y-4">
      <TextInput
        className={inputClass}
        autoComplete="username"
        keyboardType="default"
        textContentType="username"
        placeholder="Username"
        onChangeText={onChangeField('username')}
      />
      <TextInput
        className={inputClass}
        secureTextEntry
        autoComplete="password"
        placeholder="Password"
        onChangeText={onChangeField('password')}
      />
      <View className={buttonClass}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default LoginScreen;
