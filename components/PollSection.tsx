import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { getPolls } from "../lib/queries/polls";
import { PollType } from "../types";
import PollCard from "./PollCard";
import GestureRecognizer from "react-native-swipe-gestures";
type Props = {
  navigation: any;
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
      {polls && polls.length > 0 && (
        <GestureRecognizer
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        >
          {polls.slice(index, index + 1).map((poll) => (
            <PollCard key={poll.id} data={poll} navigation={navigation} />
          ))}
        </GestureRecognizer>
      )}
    </View>
  );
};

export default PollSection;
