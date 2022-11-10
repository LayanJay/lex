import { View, Text, ScrollView } from "react-native";
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
    <View style={tailwind("p-4")}>
      <Text style={tailwind("text-lg pb-3")}>Recents Questions</Text>
      <ScrollView>
        {questions &&
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              data={question}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default AllQuestionsScreen;
