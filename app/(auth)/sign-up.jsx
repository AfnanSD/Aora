import {  Text, View, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from "expo-router";

import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogged, setUser } from '../../context/authSlice'; 
import i18n from '../i18n';



import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setform] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch();
  const locale = useSelector((state) => state.locale);



  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      dispatch(setUser(result));
      dispatch(setIsLogged(true));
      
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }

    createUser();
  }

  return (
    <SafeAreaView className="bg-primary h-full" key={locale}>
      <ScrollView>
        <View className="w-full justify-center min-h-[83v] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className="text-2xl text-white mt-10 font-psemibold">{i18n.t('SIGNUP')}</Text>
          <FormField
            title={i18n.t('USERNAME')}
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e })}
            otherStyle="mt-10"
          />
          <FormField
            title={i18n.t('EMAIL')}
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title={i18n.t('PASSWORD')}
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e })}
            otherStyle="mt-7"
          />
          <CustomButton
            title={i18n.t('SIGNUP_BUTTON')}
            handlePress={submit}
            containerStyle='mt-7'
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
            {i18n.t('ACCOUNT_QUESTION_SIGNIN')}
            </Text>
            <Link href={"/sign-in"} className='text-lg font-psemibold text-secondary'>{i18n.t('SIGNIN_TEXT_BUTTON')}</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
