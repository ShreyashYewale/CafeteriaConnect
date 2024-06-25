import {View, TextInput, Button, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, email]);

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

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleLogin = async () => {
    if (isFormValid) {
      // Form is valid, perform the submission logic
      try {
        await fetch('http://localhost:8000/api/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email}),
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
      <View className="bg-green-400 rounded-lg">
        <Button title="Submit" disabled={!isFormValid} onPress={handleLogin} />
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

export default LoginScreen;
