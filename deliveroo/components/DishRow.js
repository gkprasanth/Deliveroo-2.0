import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from "../sanity"
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'

const DishRow = ({ id, name, desc, price, image }) => {

  const [isPressed, setIsPressed] = useState(false)
  const dispatch = useDispatch()
  const addItemToBasket = () =>{
      dispatch(addToBasket({id, name, desc, price, image}))
  }

  const removeItemfromBasket = () => {
    if(!items.length>0) return;
    dispatch(removeFromBasket({id}))
  }

  const items = useSelector((state)=>selectBasketItemsWithId(state, id));

  // console.log(items)
  return (
    <>
      <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-200  ${isPressed && "border-b-0" } `} >
        <View className="flex-row" >
          <View className="flex-1 pr-2" >
            <Text className="text-lg mb-1" >{name}</Text>
            <Text className="text-gray-400"  >{desc}</Text>
            <Text className="text-gray-400 mt-2" >
              ${price}
            </Text>
          </View>

          <View className="" >
            <Image source={{
              uri: urlFor(image).url()
            }}
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4"
              }}
              className="h-20  w-20 bg-gray-300 p-4"
            />
          </View>
        </View>

      </TouchableOpacity>

      {
        isPressed && (
          <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 pb-3" >
              <TouchableOpacity disabled={items.length > 0 ? false : true} onPress={removeItemfromBasket} >
                <AntDesign name="minuscircle" size={40} color={items.length > 0 ? "#00CCBB" : "gray"} />
              </TouchableOpacity>

              <Text>{items.length}</Text>

              <TouchableOpacity  onPress={addItemToBasket} >
                <AntDesign name="pluscircle" size={40} color="#00CCBB" />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </>
  )
}

export default DishRow