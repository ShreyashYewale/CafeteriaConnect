import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {StarIcon} from 'react-native-heroicons/solid';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';

interface CardType {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  short_description: string;
}

const Card = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  short_description,
}: CardType) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow"
      onPress={() =>
        navigation.navigate('Item', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          short_description,
        })
      }>
      <Image source={{uri: imgUrl}} className="h-36 w-40 rounded-sm" />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={16} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> . {genre}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
