import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { getPollAnswers, getResponseCount } from "../lib/queries/polls";
import { PollType } from "../types";

type Props = {
  data: PollType;
  navigation: any;
};

const PollCard = ({ data, navigation }: Props) => {
  const tailwind = useTailwind();
  const { id, topic, createdAt } = data;
  const [options, setOptions] = useState<any[]>();
  const [responseCount, setResponseCount] = useState<number>(0);

  useEffect(() => {
    const getPollOptions = async () => {
      const res = await getPollAnswers(id as string);
      setOptions(res);
    };
    const getResponseCountDetails = async () => {
      const count = await getResponseCount(id as string);
      setResponseCount(count ? count : 0);
    };
    if (id) {
      getPollOptions();
      getResponseCountDetails();
    }
  }, []);

  return (
    //TODO: change navigation to Poll screen
    <TouchableOpacity
      onPress={() => navigation.navigate("Home")}
      style={tailwind("w-full bg-grey-lighter px-4 py-4 rounded-sm")}
    >
      <Text style={tailwind("text-grey-darker")}>{topic}</Text>
      <View style={tailwind("py-3")}>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <View
              key={option.id}
              style={tailwind(
                "w-full bg-ash-light h-10 my-1 flex flex-row justify-between items-center px-4 "
              )}
            >
              <Text style={tailwind("text-black")}>{option.value}</Text>
            </View>
          ))}
      </View>
      <View style={tailwind("flex flex-row justify-between")}>
        {createdAt && (
          <Text style={tailwind("text-xs text-grey-main")}>
            {dayjs(createdAt.toDate()).fromNow()}
          </Text>
        )}
        <Text style={tailwind("text-xs text-grey-main")}>
          {responseCount} votes
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PollCard;
