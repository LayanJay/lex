import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getPolls } from "../lib/queries/polls";
import { PollType } from "../types";
import PollCard from "./PollCard";
import GestureRecognizer from "react-native-swipe-gestures";
import { useTailwind } from "tailwind-rn/dist";
type Props = {
  navigation: any;
  const tailwind = useTailwind()
  polls: PollType[] | [];
};
const PollSection = ({ navigation, polls }: Props) => {
  const [index, setIndex] = useState<number>(0);

  const handleSwipeLeft = () => {
    if (polls) {
      console.log("indedx:", index);
      if (index >= polls?.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };

  const handleSwipeRight = () => {
    if (polls) {
      if (index === 0) {
        setIndex(polls.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
  };

  return (
    <View>
      {polls && polls.length > 0 ? (
        <GestureRecognizer
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        >
          {polls.slice(index, index + 1).map((poll) => (
            <PollCard key={poll.id} data={poll} navigation={navigation} />
          ))}
        </GestureRecognizer>
      ) : <View style={tailwind("mb-2 bg-grey-lighter py-3 px-4 flex flex-row justify-around items-center")}>
            <Text style={tailwind("w-3/4")}>Nothing hear yet..</Text></View>}
    </View>
  );
};

export default PollSection;
