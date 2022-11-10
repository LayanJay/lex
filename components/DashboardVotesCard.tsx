import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";
import { QuestionType } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
    data: any;
}
dayjs.extend(relativeTime);
//TODO: Replace with actual user data


const DashboardVotesCard = ({ data }: Props) => {
  const tailwind = useTailwind();
  const { topic, endsOn } = data;
  const [voted, setVoted] = useState<boolean>();
  return (
    <View
      style={tailwind(
        "mb-2 bg-grey-lighter py-3 px-4 flex flex-row justify-around items-center"
      )}
    >
      <View style={tailwind("pl-1 pr-6 flex items-center")}>
        <MaterialIcons name="poll" size={24} color="black" />
      </View>
      <Text style={tailwind("w-3/4")}>{topic}</Text>

      <Text style={tailwind("px-1 text-xs ")}>
        {dayjs(endsOn.toDate()).format("mm")} min
      </Text>
    </View>
  );
};

export default DashboardVotesCard;
