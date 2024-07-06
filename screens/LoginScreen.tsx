import {View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Input, Button, Text, Header, Avatar} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    validateForm();
  }, [password, email]);

  const validateForm = () => {
    let errors: any = {};

    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleLogin = async () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      try {
        const res = await fetch(
          'https://cafeteria-connect-backend.onrender.com/api/signin',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({password, email}),
          },
        );
        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    } else {
      // Form is invalid, display error messages
      console.error('Form has errors. Please correct them.');
    }
  };

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={
          <ArrowLeftIcon
            color={'white'}
            onPress={() => navigation.navigate('Auth')}
          />
        }
      />
      <View className="p-4 items-center">
        <Avatar
          rounded
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          }}
          size={'xlarge'}
        />
      </View>
      <View className="flex-1 p-2">
        <View className="space-y-10 pt-10">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            errorMessage={errors.email}
            renderErrorMessage
          />
          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            errorMessage={errors.password}
            renderErrorMessage
          />
        </View>
        <View style={{marginTop: '35%'}}>
          <View>
            <Button
              title="LOG IN"
              disabled={!isFormValid}
              buttonStyle={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 30,
              }}
              titleStyle={{fontWeight: 'bold'}}
              onPress={handleLogin}
            />
          </View>
          <View className="items-center mt-2">
            <Text>
              Don't have a CafeConnect account?{' '}
              <Text
                style={{fontWeight: 'bold'}}
                onPress={() => navigation.navigate('Register')}>
                Register now
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
