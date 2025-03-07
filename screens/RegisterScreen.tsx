import {View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {TextInput, Button, Appbar, Text} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, email, password, cpassword]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const validateForm = () => {
    let errors: any = {};

    // Validate name field
    if (!name) {
      errors.name = 'Name is required.';
    }

    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 3) {
      errors.password = 'Password must be at least 3 characters.';
    }

    // Validate confirm password field
    if (!cpassword) {
      errors.cpassword = 'Confirm Password is required.';
    } else if (cpassword !== password) {
      errors.cpassword = 'Password should be the same';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      try {
        const res = await fetch(
          'https://cafeteria-connect-backend.onrender.com/api/signup',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
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
        <Appbar.Content title="REGISTER" />
      </Appbar.Header>
      <View className="flex-1 p-1 mt-8 justify-between">
        <View className="space-y-6">
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            error={!!errors.name}
          />
          {errors.name && <Text>{errors.name}</Text>}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            error={!!errors.email}
          />
          {errors.email && <Text>{errors.email}</Text>}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            error={!!errors.password}
            secureTextEntry
          />
          {errors.password && <Text>{errors.password}</Text>}
          <TextInput
            placeholder="Password"
            value={cpassword}
            onChangeText={setCpassword}
            error={!!errors.cpassword}
            secureTextEntry
          />
          {errors.cpassword && <Text>{errors.cpassword}</Text>}
        </View>
        <View className="mb-4">
          <Button
            mode="contained"
            disabled={!isFormValid}
            onPress={handleSubmit}>
            REGISTER
          </Button>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
