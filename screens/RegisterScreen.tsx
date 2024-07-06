import {View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Input, Button, Header, Avatar} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

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
  }, [name, email, password]);

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
          size={'large'}
        />
      </View>
      <View className="flex-1 p-2">
        <View className="space-y-6">
          <Input
            placeholder="Name"
            value={name}
            onChangeText={setName}
            errorMessage={errors.name}
            renderErrorMessage
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            errorMessage={errors.email}
            renderErrorMessage
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            errorMessage={errors.password}
            renderErrorMessage
            secureTextEntry
          />
          <Input
            placeholder="Password"
            value={cpassword}
            onChangeText={setCpassword}
            errorMessage={errors.password}
            renderErrorMessage
            secureTextEntry
          />
        </View>
        <View style={{marginTop: '25%'}}>
          <Button
            title="REGISTER"
            disabled={!isFormValid}
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 30,
            }}
            titleStyle={{fontWeight: 'bold'}}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;
