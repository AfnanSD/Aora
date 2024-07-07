import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, usePathname } from "expo-router";

import { icons } from "../constants";
import i18n from '../app/i18n';

const SearchInput = ({initialQuery}) => {

    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery||'')
    return (
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder={i18n.t('SEARCH_PLACEHOLDER')}
                placeholderTextColor='#CDCDE0'
                onChangeText={(e)=> setQuery(e)}
            />

            <TouchableOpacity
            onPress={()=>{
                if (!query) {
                    return Alert.alert('Missing query',"please input something to search results across databases")
                }

                 if (pathname.startsWith('/search')) {
                    router.setParams({query})
                 } else {
                    router.push(`/search/${query}`)
                 }
            }}>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>

        </View>
    )
}

export default SearchInput