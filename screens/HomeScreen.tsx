import {SafeAreaView, ScrollView, BackHandler} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Category from '../components/Category';
import {RootStackParamList} from '../App';
import {Appbar} from 'react-native-paper';

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

      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Auth')} />
        <Appbar.Content title="SAS Vendor" />
      </Appbar.Header>

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
