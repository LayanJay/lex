import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import Logo from '../assets/logo.png'
import Input from '../components/Input'
import { useAuth } from '../store'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'

const SignUp = ({ navigation }: any) => {
  const tailwind = useTailwind()
  const signUp = useAuth(s => s.signUp)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      occupation: '',
      nic: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await signUp(data).then(() => navigation.navigate('Home'))
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
            Sign Up
          </Text>

          <Input
            style={tailwind('border p-2 rounded-sm mb-4')}
            labelStyle={tailwind('mb-1')}
            control={control as any}
            errors={errors}
            name='firstname'
            label='First Name'
            placeholder='Ex: John'
            registerOptions={{
              required: '*Required',
            }}
          />
          <Input
            style={tailwind('border p-2 rounded-sm mb-4')}
            labelStyle={tailwind('mb-1')}
            control={control as any}
            errors={errors}
            name='lastname'
            label='Last Name'
            placeholder='Ex: Doe'
            registerOptions={{
              required: '*Required',
            }}
          />

          <Input
            style={tailwind('border p-2 rounded-sm mb-4')}
            labelStyle={tailwind('mb-1')}
            control={control as any}
            errors={errors}
            name='occupation'
            label='Occupation'
            placeholder='Ex: Lawyer'
            registerOptions={{
              required: '*Required',
            }}
          />

          <Input
            style={tailwind('border p-2 rounded-sm mb-4')}
            labelStyle={tailwind('mb-1')}
            control={control as any}
            errors={errors}
            name='nic'
            label='NIC'
            placeholder='Ex: 998745632v'
            registerOptions={{
              required: '*Required',
            }}
          />

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
          <Button onPress={onSubmit} text='Sign Up' />
          <View style={tailwind('flex items-center pt-20')}>
            <Text style={tailwind('text-sm text-gray-400')}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
              <View>
                <Text style={tailwind('font-semibold text-lg text-gray-600')}>
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ height: 50 }}></View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

export default SignUp
