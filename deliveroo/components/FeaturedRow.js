import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import RestCard from './RestCard'
import client from '../sanity'

const FeaturedRow = ({ id, title, desc }) => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        client.fetch(`
        *[_type == "featured" && _id == $id ]{
            ...,
            restaurants[]->{
                ...,
                string[]->,
                type-> {
                    name
                }
            },
        }[0]
        `, { id }).then((data) => setRestaurants(data?.restaurants))
    }, [id])
    // console.log(restaurants)
    return (
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4" >
                <Text className="font-bold text-lg" >{title}</Text>
                <AntDesign name="arrowright" size={24} color="#00CCBB" />
            </View>
            <Text className="text-xs text-gray-500 px-4" >{desc}</Text>
            <ScrollView horizontal
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                showsHorizontalScrollIndicator={false}
                className="pt-4"
            >
                {
                    restaurants.map((rest => (
                        <RestCard
                            key={rest._id}
                            id={rest._id}
                            imgUrl={rest.image}
                            title={rest.name}
                            rating={rest.rating}
                            genre={rest.type?.name}
                            address={rest.address}
                            short_desc={rest.short_desc}
                            dishes={rest.string}
                            long={rest.long}
                            lat={rest.lat}
                        />
                    )))
                }
            </ScrollView>
        </View>
    )
}

export default FeaturedRow