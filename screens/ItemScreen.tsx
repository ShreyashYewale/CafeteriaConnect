import {View, Image, FlatList} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StarIcon} from 'react-native-heroicons/solid';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {
  TextInput,
  Text,
  Button,
  Avatar,
  Appbar,
  List,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const ItemScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Item'>>();
  const {id, imgUrl, title, rating, genre, short_description} = route.params;
  const [review, setReview] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Landing')} />
        {/* <Appbar.Content title="Title" /> */}
        {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
      </Appbar.Header>
      <View className="flex-1 space-y-1">
        <View className="flex-row items-center justify-between p-2">
          <Text variant="titleLarge">{title}</Text>
          <View className="flex-row">
            <StarIcon color="green" opacity={0.5} size={26} />
            <Text variant="titleLarge" className="text-green-500">
              {rating}
            </Text>
          </View>
        </View>
        <Image source={{uri: imgUrl}} className="h-56 w-61 rounded-sm p-2" />
        <View className="p-2" style={{height: 250}}>
          <Text
            style={{
              fontFamily: 'Nunito-SemiBold',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {'Reviews'}
          </Text>
          <FlatList
            ListHeaderComponent={
              <View>
                <List.Item
                  title="Sid Singh"
                  description="Ghar Jesi Roti 😋"
                  left={() => (
                    <Avatar.Image
                      size={24}
                      source={{
                        uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                      }}
                    />
                  )}
                />
              </View>
            }
            data={[]}
            // keyExtractor={() => {}}
            renderItem={null}
          />
        </View>
        <View>
          <TextInput
            keyboardType="default"
            placeholder="Write something"
            onChangeText={(text: string) => setReview(text)}
          />
          <View className="flex-row-reverse">
            <Button onPress={() => {}}>Post</Button>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ItemScreen;
