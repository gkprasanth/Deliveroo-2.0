import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

import SanityClient from '../sanity';
import client from '../sanity';
const Home = () => {
    const navigation = useNavigation()

    const [featuredCategories, setFeaturedCategories] = useState([]);

    useEffect(() => {
        client.fetch(`
        *[_type == "featured"]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            }
        }
        `).then(data => setFeaturedCategories(data))
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);
    
    return (
        <SafeAreaView className="bg-white pt-5" >
            <View className="flex-row pb-3 items-center mx-4 space-x-2" >
                <Image className="h-7 w-7 bg-gray-300 p-4 rounded-full" source={{
                    uri: 'https://links.papareact.com/wru'
                }} />
                <View className="flex-1 justify-center" >
                    <Text className="text-gray-400 text-xs font-bold" >Deliver Now!</Text>
                    <Text className="font-bold text-xl"  >Current Location
                        <Entypo name="chevron-down" size={20} color="#00CCBB" style={{
                            marginTop: 5
                        }} />
                    </Text>
                </View>
                <Feather name="user" size={35} color="#00CCBB" />
            </View>

            <View className="flex-row items-center space-x-2 pb-2 mx-4 " >
                <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1 rounded-sm" >
                    <Ionicons name="search" size={24} color="#00CCBB" />
                    <TextInput placeholder='Restaurant and cuisines' keyboardType='default' />
                </View>
                <MaterialIcons name="settings-input-component" size={24} color="#00CCBB" />
            </View>

            <ScrollView className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {/* Categories */}
                <Categories />

                {featuredCategories.map((category, idx)=>
                <FeaturedRow
                key={category._id}
                    id={category._id}
                    title={category.name}
                    desc={category.short_desc}

                />)}


            </ScrollView>

        </SafeAreaView>
    )
}

export default Home