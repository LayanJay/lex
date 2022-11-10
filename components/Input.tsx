import React from "react";
import { View, Text, TextInput } from "react-native";
import { Style, useTailwind } from "tailwind-rn";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  control: Control;
  style?: Style;
  inputStyle?: Style;
  labelStyle?: Style;
  errors: any;
  registerOptions?: RegisterOptions;
  placeholder: string;
  multiline?: boolean;
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
  labelStyle,
  multiline = false,
}: Props) => {
  const tailwind = useTailwind();
  return (
    <View>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={style}>
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
              multiline
            />
          )}
          name={name}
        />
      </View>
      <View style={tailwind("w-full flex flex-row justify-end pt-0.5")}>
        {errors[name] && errors[name].message ? (
          <Text style={tailwind("text-xs text-red-500")}>
            {errors[name].message}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default Input;
