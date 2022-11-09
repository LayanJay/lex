import { PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display'
import { useFonts } from 'expo-font'
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist'
import Logo from '../assets/logo.png'
import { useForm, Controller } from 'react-hook-form'
import Input from '../components/Input'

const SignIn = () => {
  const tailwind = useTailwind()
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
  })
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

  const onSubmit = handleSubmit((data: any) => console.log(data))

  if (!fontsLoaded) {
    return null
  } else {
    return (
      <SafeAreaView style={tailwind('py-4 px-4 bg-white h-full')}>
        <View style={tailwind('flex items-center justify-center')}>
          <Image style={tailwind('mb-6')} source={Logo} />
          <Text style={tailwind('font-primary-600 font-semibold text-4xl')}>
            Log In
          </Text>
          <Input
            control={control as any}
            errors={errors}
            name='email'
            label='Email'
            placeholder='Ex: johndoe@email.com'
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default SignIn
