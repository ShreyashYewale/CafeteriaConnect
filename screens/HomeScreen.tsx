import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import Category from '../components/Category';
import {RootStackParamList} from '../App';
import {Header} from '@rneui/themed';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Auth');
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView className="bg-white pt-2">
      {/* Header */}
      <Header
        elevated
        leftComponent={
          <Image
            source={{
              uri: '', // logo image can be used here
            }}
            className="h-9 w-9 bg-gray-300 rounded-full"
          />
        }
        centerComponent={
          <Text className="font-bold pt-1 ml-1 text-xl text-white">
            SAS Vendor
          </Text>
        }
        rightComponent={<UserIcon size={30} color="white" />}
      />

      {/* Search */}
      <View className="flex-row items-center space-x-2 mx-2 mt-2 pb-2">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 pl-2 items-center">
          <MagnifyingGlassIcon size={20} color={'gray'} />
          <TextInput placeholder="Search your menu" keyboardType="default" />
        </View>
        <AdjustmentsVerticalIcon color={'#3cb371'} />
      </View>

      {/* Body */}

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{paddingBottom: 100}}>
        {/*Category  */}
        <Category
          id={'1'}
          type={'breakfast'}
          title={'Breakfast'}
          description={'Breakfast Description'}
        />
        <Category
          id={'2'}
          type={'lunch'}
          title={'Lunch'}
          description={'Lunch Description'}
        />
        <Category
          id={'3'}
          type={'snacks'}
          title={'Snacks'}
          description={'Snacks Description'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
