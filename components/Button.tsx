import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

interface Props {
  onPress: () => void
  text: string
  fullWidth?: boolean
}

const Button = ({ onPress, text, fullWidth = true }: Props) => {
  const tailwind = useTailwind()
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tailwind(
          `py-3 px-4 bg-black ${fullWidth ? 'w-full' : ''} rounded-sm`
        )}
      >
        <Text style={tailwind('font-medium uppercase text-center text-white')}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
