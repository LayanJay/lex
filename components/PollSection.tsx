import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { getPolls } from "../lib/queries/polls";
import { PollType } from "../types";
import PollCard from "./PollCard";
import GestureRecognizer from "react-native-swipe-gestures";

const PollSection = ({ navigation }: any) => {
  const [polls, setPolls] = useState<PollType[]>();
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const getPollDetails = async () => {
      const data = await getPolls();
      setPolls(data.slice(0, 10));
    };
    getPollDetails();
  }, []);

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
