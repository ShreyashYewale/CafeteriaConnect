import {View, Image, Text as RNText, FlatList} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StarIcon} from 'react-native-heroicons/solid';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Header, Input, Text, Button, ListItem, Avatar} from '@rneui/themed';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
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
      <Header
        leftComponent={
          <ArrowLeftIcon
            color={'white'}
            onPress={() => navigation.navigate('Home')}
          />
        }
      />
      <View className="flex-1 space-y-1">
        <View className="flex-row items-center justify-between p-2">
          <Text
            h4
            h4Style={{
              fontFamily: 'Nunito-SemiBold',
              fontWeight: '700',
            }}>
            {title}
          </Text>
          <View className="flex-row">
            <StarIcon color="green" opacity={0.5} size={26} />
            <RNText className="text-green-500 text-lg">{rating}</RNText>
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
                <ListItem
                  bottomDivider
                  containerStyle={{backgroundColor: 'rgb(243 244 246)'}}>
                  <Avatar
                    rounded
                    source={{
                      uri: '',
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>Sid Singh</ListItem.Title>
                    <ListItem.Subtitle>Ghar Jesi Roti 😋</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
                <ListItem
                  bottomDivider
                  containerStyle={{backgroundColor: 'rgb(243 244 246)'}}>
                  <Avatar
                    rounded
                    source={{
                      uri: '',
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>Bahaduri</ListItem.Title>
                    <ListItem.Subtitle>Really Awesome 👌</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </View>
            }
            data={[]}
            // keyExtractor={() => {}}
            renderItem={null}
          />
        </View>
        <View>
          <Input
            keyboardType="default"
            placeholder="Write something"
            onChangeText={(text: string) => setReview(text)}
          />
          <View className="flex-row-reverse">
            <Button
              title="Post"
              buttonStyle={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 10,
              }}
              titleStyle={{fontWeight: 'bold'}}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ItemScreen;
