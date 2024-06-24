import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {ArrowRightCircleIcon} from 'react-native-heroicons/outline';
import Card from './Card';

interface CategoryType {
  id: string;
  type: string;
  title: string;
  description: string;
}

const Category = ({id, type, title, description}: CategoryType) => {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightCircleIcon size={20} color={'#3cb371'} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        showsHorizontalScrollIndicator={false}
        className="pt-2">
        <Card
          id={'123'}
          imgUrl={
            'https://cdn.pixabay.com/photo/2022/05/07/16/38/poha-7180676_1280.jpg'
          }
          title={'Poha'}
          rating={4.7}
          genre={'Indian'}
          short_description={'Light food'}
        />
        <Card
          id={'123'}
          imgUrl={
            'https://cdn.pixabay.com/photo/2022/05/07/16/38/poha-7180676_1280.jpg'
          }
          title={'Poha'}
          rating={4.7}
          genre={'Indian'}
          short_description={'Light food'}
        />
        <Card
          id={'123'}
          imgUrl={
            'https://cdn.pixabay.com/photo/2022/05/07/16/38/poha-7180676_1280.jpg'
          }
          title={'Poha'}
          rating={4.7}
          genre={'Indian'}
          short_description={'Light food'}
        />
      </ScrollView>
    </View>
  );
};

export default Category;
