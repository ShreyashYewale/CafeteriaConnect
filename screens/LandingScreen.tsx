import {View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import BottomNav from '../components/BottomNav';
import HomeScreen from './HomeScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import CommentScreen from './CommentScreen';
import ProfileScreen from './ProfileScreen';
import {Text} from 'react-native-paper';

const NotificationsRoute = () => <Text>Notifications</Text>;

const LandingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <View className="flex-1">
      <BottomNav
        sceneMap={{
          home: HomeScreen,
          comments: CommentScreen,
          profile: ProfileScreen,
          notifications: NotificationsRoute,
        }}
        routes={[
          {
            key: 'home',
            title: 'Home',
            focusedIcon: 'home',
            unfocusedIcon: 'home-outline',
          },
          {
            key: 'comments',
            title: 'Comments',
            focusedIcon: 'chat',
            unfocusedIcon: 'chat-outline',
          },
          {
            key: 'profile',
            title: 'Profile',
            focusedIcon: 'person',
            unfocusedIcon: 'person-outline',
          },
          {
            key: 'notifications',
            title: 'Notifications',
            focusedIcon: 'bell',
            unfocusedIcon: 'bell-outline',
          },
        ]}
      />
    </View>
  );
};

export default LandingScreen;
