import { Text, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign } from "@expo/vector-icons";
import { QuestionType } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/RootNavigator";

dayjs.extend(relativeTime);

type QuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AllQuestions"
>;

type Props = {
  data: QuestionType;
  navigation: QuestionScreenNavigationProp;
};

//TODO: Replace with actual user data
const user = "7JwLj0rwO1uIkBg5lBZi";
const userName = "Saul GoodMan";

const QuestionCard = ({ data, navigation }: Props) => {
  const tailwind = useTailwind();
  const { id, title, createdAt, upvotes } = data;
  const [voted, setVoted] = useState<boolean>();
  useEffect(() => {
    if (upvotes) {
      setVoted(upvotes.includes(user));
    }
  }, [upvotes]);
  return (
    <TouchableOpacity
      style={tailwind(
        "mb-2 bg-grey-lighter py-3 px-4 flex flex-row justify-around items-center"
      )}
      onPress={() => {
        navigation.navigate("SingleQuestion", { questionId: id as string });
      }}
    >
      <View style={tailwind("pl-1 pr-6 flex items-center")}>
        <AntDesign name={voted ? "like1" : "like2"} size={24} color="black" />
        <Text style={tailwind("text-xs pt-1")}> {upvotes.length}</Text>
      </View>
      <Text style={tailwind("w-3/4")}>{title}</Text>

      <Text style={tailwind("px-1 text-xs ")}>
        {dayjs(createdAt.toDate()).format("mm")} min
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionCard;
