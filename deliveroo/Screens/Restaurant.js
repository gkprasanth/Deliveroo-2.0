import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { urlFor } from '../sanity';
import { Entypo, EvilIcons, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
const Restaurant = () => {
    const {
        params: {
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
        }
    } = useRoute();



    const dispatch = useDispatch()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    useEffect(() => {
        dispatch(setRestaurant({
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
        }))
    }, [])

    return (
        <>
            <BasketIcon />

            <ScrollView>
                <View className="relative" >
                    <Image source={{
                        uri: urlFor(imgUrl).url()
                    }}

                        className="w-full h-56 bg-gray-300 p-4"
                    />
                    <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-slate-100 rounded-full" >
                        <AntDesign name="arrowleft" size={24} color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="bg-white" >
                    <View className="px-4 pt-4" >
                        <Text className="text-3xl font-bold" >{title}</Text>
                        <View className="flex-row space-x-2 my-1 items-center" >
                            <View className="flex-row items-center space-x-1" >
                                <FontAwesome size={22} name="star" color="#028d15a1" />
                                <Text className='text-gray-500' > <Text className="text-[#028d15a1]" >{rating}</Text> . {genre}</Text>
                            </View>
                            <View className='flex-row items-center' >
                                <EvilIcons name="location" size={22} color="gray" />
                                <Text className='text-xs text-gray-500' >Nearby . {address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2  pb-4" >
                            {short_desc}
                        </Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300" >
                        <EvilIcons name="question" size={20} color="gray" />
                        <Text className="pl-2 flex-1 text-md font-bold" >
                            Have a food allergy?
                        </Text>
                        <Entypo name="chevron-right" size={24} color="#00CCBB" />
                    </TouchableOpacity>


                    <View className="pb-36"  >

                        <View className="bg-gray-100" >
                            <Text className="px-4 pt-6 mb-3 font-bold text-xl" >
                                Menu
                            </Text>


                            {
                                dishes.map((dish) => (<DishRow
                                    key={dish._id}
                                    id={dish._id}
                                    desc={dish.short_desc}
                                    price={dish.price}
                                    image={dish.image}
                                    name={dish.name} />))
                            }


                        </View>
                    </View>

                </View>
            </ScrollView>
        </>


    )
}

export default Restaurant