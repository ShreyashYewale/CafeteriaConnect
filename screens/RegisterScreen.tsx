import {View, TextInput, Button, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

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

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      try {
        const res = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password}),
        });
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
    <View className="flex-1 p-2 justify-center space-y-4">
      <TextInput
        className="border border-gray-300 rounded-lg"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-gray-300 rounded-lg"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-gray-300 rounded-lg"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="bg-green-400 rounded-lg">
        <Button title="Submit" disabled={!isFormValid} onPress={handleSubmit} />
      </View>

      {/* Display error messages */}
      {Object.values(errors).map((error, index) => (
        <Text key={index} className="text-red-700">
          {error}
        </Text>
      ))}
    </View>
  );
};

export default RegisterScreen;
