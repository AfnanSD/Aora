import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from "expo-router";

import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { icons } from '../../constants'
import InfoBox from "../../components/InfoBox";
import { setIsLogged, setUser } from '../../context/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n';
import { setLocale } from '../../context/localeSlice';



const Profile = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();

    dispatch(setUser(null));
    dispatch(setIsLogged(false));

    router.replace("/sign-in");
  }

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

  return (
    <SafeAreaView className="bg-primary h-screen" key={locale}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />

        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <View className="flex flex-row justify-between items-center w-full">
              <TouchableOpacity onPress={changeLanguage}>
                <Image
                  source={icons.translate}
                  resizeMode='contain'
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={logout}>
                <Image
                  source={icons.logout}
                  resizeMode='contain'
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>


            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyle='mt-5'
              titleStyle='text-lg'
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle={i18n.t('POSTS')}
                containerStyle='mr-10'
                titleStyle='text-xl'
              />
              <InfoBox
                // followers number is hardcoded
                title='1.2K'
                subtitle={i18n.t('FOLLOWERS')}
                containerStyle='Followers'
                titleStyle='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={i18n.t('EMPTY_STATE_TITLE')}
            subtitle={i18n.t('EMPTY_STATE_TITLE')}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile