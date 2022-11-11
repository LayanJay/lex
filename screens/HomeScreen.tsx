import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../lib/queries/questions";
import { QuestionType } from "../types";
import PollCard from "../components/PollCard";
import PollSection from "../components/PollSection";

const HomeScreen = ({ navigation }: any) => {
  const tailwind = useTailwind();
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getQuestionDetails = async () => {
    setQuestions(await getQuestions());
  };
  useEffect(() => {
    getQuestionDetails();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getQuestionDetails();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={tailwind("p-4 h-full")}
    >
      <Image
        style={tailwind("w-full h-36 rounded-md")}
        source={require("../assets/home-banner.png")}
      />
      <View style={tailwind("py-3")}>
        <Text style={tailwind("text-lg")}>Recent Polls</Text>
        <View style={tailwind("pt-3")}>
          <PollSection />
        </View>
      </View>
      <View style={tailwind("py-2")}>
        <Text style={tailwind("text-lg")}>Recent Questions</Text>
        <View style={tailwind("py-3")}>
          {questions &&
            questions.length > 0 &&
            questions
              .slice(0, 5)
              .map((question: QuestionType) => (
                <QuestionCard
                  key={question.id}
                  data={question}
                  navigation={navigation}
                />
              ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
