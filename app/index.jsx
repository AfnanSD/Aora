import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/customButton';
import React, { useEffect,useState } from "react";
import { icons } from '../constants';


import { signOut } from '../lib/appwrite';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../context/authSlice';
import i18n from './i18n';
import { setLocale } from '../context/localeSlice';


export default function App() {


    //new
    const dispatch = useDispatch();
    const { isLogged, loading } = useSelector((state) => state.auth);
    // const [locale, setLocale] = useState(i18n.locale);
    const locale = useSelector((state) => state.locale);

    const changeLanguage = () => {
        
        console.log('before ',i18n.locale);
        if (i18n.locale == 'en') {
            i18n.locale = 'ar'
            // setLocale('ar')
            dispatch(setLocale('ar'));
        } else {
            i18n.locale = 'en'
            // setLocale('en')
            dispatch(setLocale('en'));
        }
        console.log('after ',i18n.locale);
      };


    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);



    if (!loading && isLogged) {
        return <Redirect href={"/home"} />
    }


    return (
        <SafeAreaView className="bg-primary h-full" key={locale}>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <TouchableOpacity className="w-full items-start mb-10" onPress={changeLanguage}>
                        <Image
                            source={icons.translate}
                            resizeMode='contain'
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>

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
                            {i18n.t('WELCOME')} {' '}
                            <Text className="text-secondary-200">
                                Aora
                            </Text>
                        </Text>
                        <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                            resizeMode='"contain' />
                    </View>

                    <Text className="text-sm text-gray-100 mt-7 text-center">{i18n.t('APP_IDEA')}</Text>

                    <CustomButton
                        title={i18n.t('EMAIL_BUTTON')}
                        handlePress={() =>
                            // signOut() }
                            router.push('/sign-in')}
                        containerStyle="w-full mt-7"
                    />

                </View>
            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}
