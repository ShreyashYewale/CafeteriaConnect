import {View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {TextInput, Button, Text, Appbar} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

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
        navigation.navigate('Landing');
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
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Auth')} />
        <Appbar.Content title="LOG IN" />
      </Appbar.Header>
      <View className="flex-1 p-1 mt-20 justify-between">
        <View className="space-y-10">
          <View>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              error={!!errors.email}
            />
            {errors.email && <Text>{errors.email}</Text>}
          </View>
          <View>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={!!errors.password}
            />
            {errors.password && <Text>{errors.password}</Text>}
          </View>
        </View>
        <View className="mb-4">
          <Button
            mode="contained"
            disabled={!isFormValid}
            onPress={handleLogin}>
            LOG IN
          </Button>
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
