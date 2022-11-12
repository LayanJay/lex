import { View, Text, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn";
import QuestionCard from "../components/QuestionCard";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { QuestionType } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import dayjs from "dayjs";
import withProtected from "../hooks/auth/withProtected";

type QuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AllQuestions"
>;

type Props = {
  navigation: QuestionScreenNavigationProp;
};

const AllQuestionsScreen = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const [questions, setQuestions] = useState<QuestionType[]>();

  useEffect(() => {
    const q = query(collection(db, "questions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data: QuestionType[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as QuestionType);
      });
      setQuestions(data);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={tailwind("p-4 h-full relative")}>
      <Text style={tailwind("font-primary-600 text-lg pb-3")}>Recents Questions</Text>
      <ScrollView>
        {questions && questions.length > 0 ? (
          questions
            .sort((a, b) =>
              a.createdAt &&
              b.createdAt &&
              dayjs(a.createdAt.toDate()).isBefore(
                b.createdAt && dayjs(b.createdAt.toDate())
              )
                ? 1
                : -1
            )
            .map((question) => (
              <QuestionCard
                key={question.id}
                data={question}
                navigation={navigation}
              />
            ))
        ) : (
          <View style={tailwind("flex items-center py-8 justify-center ")}>
            <Text style={tailwind("text-grey-main")}>Nothing here yet.</Text>
          </View>
        )}
      </ScrollView>
      <View style={tailwind("absolute bottom-0 right-0 mx-3 my-3 z-20")}>
        <Pressable
          onPress={() => navigation.navigate("AddQuestion")}
          style={tailwind(
            "bg-black p-4 rounded-full flex items-center justify-center"
          )}
        >
          <Ionicons
            style={tailwind("pl-1")}
            name="add-outline"
            size={44}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default withProtected(AllQuestionsScreen);