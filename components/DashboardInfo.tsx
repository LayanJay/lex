import React from 'react'
import { Text, View } from 'react-native'
import { useTailwind } from 'tailwind-rn/dist';

type Props = {
    role: string;
    firstname: string;
    lastname: string;
}

const DashboardInfo = ({role, firstname, lastname}: Props) => {
    const tailwind = useTailwind();
    const displayName = firstname + ' ' + lastname;

  return (
    <View style={tailwind("flex flex-row justify-between")}>
                <View>
                    <Text style={tailwind("text-2xl font-semibold")}>Dashboard</Text>
                    <Text style={tailwind("text-lg text-gray-400")}>{firstname} {lastname}</Text>
                    <View style={tailwind("bg-gray-400 flex flex-row justify-center")}>
                        <Text style={tailwind("text-xs font-light ")}>{role}</Text>
                    </View>
                </View>
                <View>
                <View style={tailwind("bg-gray-500 rounded-full")}>
                    <Text style={tailwind("font-bold text-xl uppercase p-4")}>
            {displayName?.split(' ')[0][0]}
            {displayName?.split(' ')[1] ? displayName?.split(' ')[1][0]:''}
        </Text>
                </View>
                </View>
                
                
            </View>
  )
}

export default DashboardInfo