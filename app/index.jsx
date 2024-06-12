import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/customButton';

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84]px"
                        resizeMode='contain'
                    />

                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilites with {' '}
                            <Text className="text-secondary-200">
                                Aora
                            </Text>
                        </Text>
                        <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMode='"contain' />
                    </View>

                    <Text className="text-sm text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journy of limitless exploration with Aora</Text>

                    <CustomButton />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}