import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { FontAwesome } from '@expo/vector-icons'

interface Props {
  onPress: () => void
  text: string
  fullWidth?: boolean
  loading?: boolean
}

const Button = ({ onPress, text, fullWidth = true, loading }: Props) => {
  const tailwind = useTailwind()
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tailwind(
          `flex items-center py-3 px-4 bg-black ${
            fullWidth ? 'w-full' : ''
          } rounded-sm`
        )}
      >
        {loading ? (
          <FontAwesome name='spinner' size={24} color='white' />
        ) : (
          <Text
            style={tailwind('font-medium uppercase text-center text-white')}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
