import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video, ResizeMode } from "expo-av";
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import FormField from '../../components/FormField'
import CustomButton from "../../components/customButton";
import { icons } from "../../constants";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from '../../context/GlobalProvider';


const Create = () => {

  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })
  const [uploading, setUploading] = useState(false)
  const submit = () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      Alert.alert('Error', 'Please upload all the fileds');
    }

    setUploading(true);

    try {
// console.log(user);
// console.log(user.$id);
      createVideo({ ...form, userId: user.$id });

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      });
      setUploading(false);
    }
  }

  const openPicker = async (selectType) => {
    // const result = await DocumentPicker.getDocumentAsync({
    //   type: selectType === 'image' 
    //   ? ['image/png', 'image/jpg']
    //   : ['video/mp4','video/gif']
    // })
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image"
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
    // else{
    //    setTimeout(() => {
    //     Alert.alert('Document picker', JSON.stringify(result,null,2))
    //    }, 100);
    // }
  }

  return (
    <SafeAreaView className="bg-primary h-screen">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyle="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )
            }
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-2xl text-white font-psemibold">
            Upload Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )
            }
          </TouchableOpacity>
        </View>

        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyle="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={uploading}
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create