import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'
import Input from '../components/Input'
import React from 'react'
import Button from '../components/Button'
import { useAuth } from '../store'

const SignIn = ({ navigation }: any) => {
  const tailwind = useTailwind()
  const signIn = useAuth(s => s.signIn)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await signIn({ ...data })
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <ScrollView style={tailwind('py-4 px-4 bg-white')}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tailwind('flex')}>
          <Image style={tailwind('mb-6 mx-auto')} source={Logo} />
          <Text
            style={tailwind(
              'font-primary-600 font-semibold text-4xl text-center mb-4'
            )}
          >
            Log In
          </Text>
          <Input
            style={tailwind('border p-2 rounded-sm mb-4')}
            labelStyle={tailwind('mb-1')}
            control={control as any}
            errors={errors}
            name='email'
            label='Email'
            placeholder='Ex: johndoe@email.com'
            registerOptions={{
              required: '*Required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email must be a valid email',
              },
            }}
          />
          <Input
            style={tailwind('border p-2 rounded-sm mb-4')}
            labelStyle={tailwind('mb-1')}
            control={control as any}
            errors={errors}
            name='password'
            label='Password'
            placeholder='Ex: ********'
            registerOptions={{
              required: '*Required',
              pattern: {
                value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/,
                message: 'Must have a lowercase, an uppercase & a number',
              },
              minLength: {
                value: 8,
                message: 'The password should be 8 characters long',
              },
            }}
          />
          <Button onPress={onSubmit} text='Sign In' />
          <View style={tailwind('flex items-center pt-20')}>
            <Text style={tailwind('text-sm text-gray-400')}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <View>
                <Text style={tailwind('font-semibold text-lg text-gray-600')}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

export default SignIn
