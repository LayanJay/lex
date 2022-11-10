import React from 'react'
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

type Props = {
    type: string;
    number: number;
    p: any;
}

const DataCard = ({type, number, p}: Props) => {
     const tailwind = useTailwind();
  return (
    <View style={tailwind("bg-gray-300 rounded-md border-2 border-black")}>
                    <View style={tailwind(`${p}`)}>
                            <Text style={tailwind("font-light text-xs flex flex-row self-center")}>
                            {type}
                        </Text>
                        <Text style={tailwind("font-bold text-4xl flex flex-row self-center")}>
                            {number}
                        </Text>
                        
                        
                        
                    </View>
                </View>
  );
};

export default DataCard;