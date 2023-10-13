import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { EvilIcons, FontAwesome } from '@expo/vector-icons'
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_desc,
    dishes,
    long,
    lat
}) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Restaurant', {
                    id,
                    imgUrl,
                    title,
                    rating,
                    genre,
                    address,
                    short_desc,
                    dishes,
                    long,
                    lat
                })
            }}
            className="bg-white mr-3 shadow-sm" >
            <Image source={{
                uri: urlFor(imgUrl).url()
            }}
                className="h-36 w-64"
            />
            <View className="px-2 pb-4" >
                <Text className='font-bold text-xl pt-2' >{title}</Text>

                <View className="flex-row items-center space-x-1" >
                    <FontAwesome name="star" color="#028d15a1" />
                    <Text className='text-gray-500' > <Text className="text-[#028d15a1]" >{rating}</Text> . {genre}</Text>
                </View>

                <View className='flex-row pt-2 items-center' >
                    <EvilIcons name="location" size={22} color="gray" />
                    <Text className='text-xs text-gray-500' >Nearby . {address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RestCard