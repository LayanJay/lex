import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { PollType } from "../types";

type Props = {
  data: PollType;
};

const PollCard = ({ data }: Props) => {
  const tailwind = useTailwind();
  const { id, topic, description } = data;
  return (
    <TouchableOpacity
      style={tailwind("w-full bg-grey-lighter px-4 py-4 rounded-sm")}
    >
      <Text style={tailwind("text-grey-darker")}>{topic}</Text>
      <View style={tailwind("py-3")}>
        <View
          style={tailwind(
            "w-full bg-ash-light h-10 my-1 flex flex-row justify-between items-center px-4 "
          )}
        >
          <Text style={tailwind("text-black")}>Yes</Text>
          <Text style={tailwind("text-black")}> 70%</Text>
        </View>
        <View
          style={tailwind(
            "w-full bg-ash-light h-10 my-1 flex flex-row justify-between items-center px-4 "
          )}
        >
          <Text style={tailwind("text-black")}>Yes</Text>
          <Text style={tailwind("text-black")}> 70%</Text>
        </View>
        <View
          style={tailwind(
            "w-full bg-ash-light h-10 my-1 flex flex-row justify-between items-center px-4 "
          )}
        >
          <Text style={tailwind("text-black")}>Yes</Text>
          <Text style={tailwind("text-black")}> 70%</Text>
        </View>
        <View
          style={tailwind(
            "w-full bg-ash-light h-10 my-1 flex flex-row justify-between items-center px-4 "
          )}
        >
          <Text style={tailwind("text-black")}>Yes</Text>
          <Text style={tailwind("text-black")}> 70%</Text>
        </View>
      </View>
      <View style={tailwind("flex flex-row justify-between")}>
        <Text style={tailwind("text-xs text-grey-main")}>30 mins ago</Text>
        <Text style={tailwind("text-xs text-grey-main")}>400 votes</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PollCard;
