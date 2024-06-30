import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { decrement, increment } from '../context/actions/counterAction'
import { connect } from "react-redux";
const Counter = ({ count, increment, decrement }) => {
    return (
        <View className="flex-1 items-center justify-center space-y-6">
            <Text className="text-3xl font-bold text-zinc-600">Counter</Text>
            <View className="flex items-center justify-center p-12 border border-zinc-400 rounded-xl">
                <Text className="text-3xl font-bold text-zinc-600">{count}</Text>
            </View>

            <View className="flex flex-row items-center justify-evenly w-full">
                <TouchableOpacity className="py-3 px-5  bg-blue-500  rounded-xl flex items-center justify-center" onPress={increment}>
                    <Text className="text-3xl font-bold text-gray-50">+</Text>
                </TouchableOpacity>
                <TouchableOpacity className="py-3 px-5  bg-blue-500 rounded-xl flex items-center justify-center" onPress={decrement}>
                    <Text className="text-3xl font-bold text-gray-50">-</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    count: state.counter.count,
})

const mapDispatchToProps = {
    increment,
    decrement,
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)