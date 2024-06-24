import {View, TextInput, Button} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {inputClass} from '../css-util';

const RegisterScreen = () => {
  const {register, handleSubmit, setValue} = useForm();

  const onSubmit = useCallback((formData: any) => {
    console.log(formData, formData.username);
  }, []);

  const onChangeField = useCallback(
    (name: string) => (text: string) => {
      setValue(name, text);
    },
    [],
  );

  useEffect(() => {
    register('username');
    register('email');
    register('password');
    register('confirm password');
  }, [register]);

  return (
    <View className="flex-1 items-center justify-center  p-2 space-y-4">
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
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Email"
        onChangeText={onChangeField('email')}
      />
      <TextInput
        className={inputClass}
        secureTextEntry
        autoComplete="password"
        placeholder="Password"
        onChangeText={onChangeField('password')}
      />
      <TextInput
        className={inputClass}
        secureTextEntry
        autoComplete="password"
        placeholder="Confirm Password"
        onChangeText={onChangeField('confirm password')}
      />
      <View className="mt-2">
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default RegisterScreen;
