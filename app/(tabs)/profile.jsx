import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
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


const Profile = () => {

  const dispatch = useDispatch();
  const {  user } = useSelector((state) => state.auth);

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();

    dispatch(setUser(null));
    dispatch(setIsLogged(false));

    router.replace("/sign-in");
  }

  return (
    <SafeAreaView className="bg-primary h-screen">
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
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image
                source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </TouchableOpacity>

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
                subtitle="Posts"
                containerStyle='mr-10'
                titleStyle='text-xl'
              />
              <InfoBox
                // followers number is hardcoded
                title='1.2K'
                subtitle="Followers"
                containerStyle='Followers'
                titleStyle='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No  videos found"
            subtitle="No videos found"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile