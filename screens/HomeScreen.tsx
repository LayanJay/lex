import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import { useTailwind } from "tailwind-rn";
import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { getQuestions } from "../lib/queries/questions";
import { PollType, QuestionType } from "../types";
import PollSection from "../components/PollSection";
import Button from "../components/Button";
import withProtected from "../hooks/auth/withProtected";
import { useAuth } from "../store";
import { getPolls } from "../lib/queries/polls";

const HomeScreen = ({ navigation }: any) => {
  const user = useAuth((s) => s.user);
  const [polls, setPolls] = useState<PollType[]>([]);

  const tailwind = useTailwind();
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getQuestionDetails = async () => {
    setQuestions(await getQuestions());
  };
  const getPollDetails = async () => {
    const data = await getPolls();
    setPolls(data.slice(0, 10));
  };
  useEffect(() => {
    getQuestionDetails();
    getPollDetails();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getQuestionDetails();
    await getPollDetails();
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
        <Text style={tailwind("font-primary-600 text-lg")}>Recent Polls</Text>
        <View style={tailwind("pt-3")}>
          <PollSection navigation={navigation} polls={polls} />
        </View>
      </View>
      <View style={tailwind("py-2")}>
        <Text style={tailwind("font-primary-600 text-lg")}>
          Recent Questions
        </Text>
        <View style={tailwind("py-3")}>
          {questions && questions.length > 0 ? (
            questions
              .slice(0, 5)
              .map((question: QuestionType) => (
                <QuestionCard
                  key={question.id}
                  data={question}
                  navigation={navigation}
                />
              ))
          ) : (
            <View
              style={tailwind(
                "mb-2 bg-grey-lighter py-3 px-4 flex flex-row justify-around items-center"
              )}
            >
              <Text style={tailwind("w-3/4")}>Nothing here yet..</Text>
            </View>
          )}
        </View>
      </View>

      {/* TODO: remove this button later */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default withProtected(HomeScreen);
