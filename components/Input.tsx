import { View, Text, TextInput } from 'react-native'
import { Style } from 'tailwind-rn/dist'
import { Controller, Control, RegisterOptions } from 'react-hook-form'

interface Props {
  label: string
  name: string
  control: Control
  style?: Style
  inputStyle?: Style
  errors: any
  registerOptions?: RegisterOptions
  placeholder: string
}

const Input = ({
  label,
  name,
  control,
  style,
  inputStyle,
  errors,
  registerOptions,
  placeholder,
}: Props) => {
  return (
    <View style={style}>
      <Text>{label}</Text>
      <Controller
        control={control}
        rules={registerOptions}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            style={inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors[name] && errors[name].message ? (
        <Text>{errors[name].message}</Text>
      ) : null}
    </View>
  )
}

export default Input
