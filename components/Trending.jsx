import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Video, ResizeMode } from "expo-av";

import { icons } from "../constants";

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1,
    }
}
const zoomOut = {
    0: {
        scale: 1.1
    },
    1: {
        scale: 0.9,
    }
}

const TrendingItme = ({ activeItem, item }) => {

    const [play, setPlay] = useState(false)
    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play ?
                (
                    <Video
                        source={{ uri: item.video }}
                        className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setPlay(false);
                            }
                        }}
                    />
                ) : (
                    <TouchableOpacity
                        className="relative justify-center items-center"
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        < ImageBackground
                            source={{ uri: item.thumbnail }}
                            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                            resizeMode='cover'
                        />

                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )
            }
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {

    const [activeItme, setActiveItme] = useState(posts[1])
    const viewableItemsChanged = ({ viewableItems }) => {
        setActiveItme(viewableItems[0].key)
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItme
                    activeItem={activeItme} item={item}
                >
                </TrendingItme>
            )}
            horizontal
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{
                x: 170
            }}
        />
    )
}

export default Trending