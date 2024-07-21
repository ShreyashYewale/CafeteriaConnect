import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ItemScreen from './screens/ItemScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import LandingScreen from './screens/LandingScreen';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Auth: undefined;
  Profile: {userId: string};
  Item: {
    id: string;
    imgUrl: string;
    title: string;
    rating: number;
    genre: string;
    short_description: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen}></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}></Stack.Screen>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}></Stack.Screen>
            <Stack.Screen name="Item" component={ItemScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
