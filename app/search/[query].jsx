import { View, Text, FlatList } from 'react-native'
import React, {  useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import i18n from '../i18n';

const Search = () => {

  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(()=>searchPosts(query));

  useEffect(() => {
    refetch()
  }, [query])


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />

        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              {i18n.t("SEARCH_RESULTS")}
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={i18n.t("EMPTY_STATE_TITLE")}
            subtitle={i18n.t("EMPTY_STATE_SUBTITLE")}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search