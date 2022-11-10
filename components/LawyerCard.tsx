import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";
import { QuestionType } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

dayjs.extend(relativeTime);
type Props = {
 data: any
};
const LawyerCard = ({ data }: Props) => {
  const tailwind = useTailwind();
  const { firstname, lastname } = data;
  const displayName = firstname + ' ' + lastname
  return (
    <View
      style={tailwind(
        "mb-2 bg-grey-lighter py-2 flex flex-row justify-around items-center"
      )}
    >
      <View style={tailwind("pr-1")}>
        <View style={tailwind("bg-gray-500 rounded-full")}>
         <Text style={tailwind("font-bold uppercase p-1")}>
            {displayName?.split(' ')[0][0]}
            {displayName?.split(' ')[1] ? displayName?.split(' ')[1][0]:''}
        </Text>
        </View>
       
      </View>
      <Text style={tailwind("w-3/4")}>{firstname} {lastname}</Text>
    </View>
  );
};

export default LawyerCard;
