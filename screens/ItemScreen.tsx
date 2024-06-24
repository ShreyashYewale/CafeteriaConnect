import {View, Text, Image, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import {StarIcon} from 'react-native-heroicons/solid';
import {inputClass} from '../css-util';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../App';

const ItemScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Item'>>();
  const {id, imgUrl, title, rating, genre, short_description} = route.params;
  const [review, setReview] = useState('');

  return (
    <View>
      <View className="flex-row items-center justify-between p-2">
        <Text className="font-bold text-lg">{title}</Text>
        <View className="flex-row">
          <StarIcon color="green" opacity={0.5} size={26} />
          <Text className="text-green-500 text-lg">{rating}</Text>
        </View>
      </View>
      <Image source={{uri: imgUrl}} className="h-56 w-61 rounded-sm p-2" />
      <View className="p-2">
        <Text className="font-bold text-lg">{'Reviews'}</Text>
        <TextInput
          className={inputClass}
          keyboardType="default"
          placeholder="Write something"
          onChangeText={(text: string) => setReview(text)}
        />
        <View className="flex-row-reverse">
          <Button title="Post" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default ItemScreen;
