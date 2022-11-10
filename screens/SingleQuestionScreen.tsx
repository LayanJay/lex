import { View, Text, Button, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { RouteProp } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn/dist";
import { getQuestion } from "../lib/queries/questions";
import { AnswerType, QuestionType } from "../types";
import { AntDesign } from "@expo/vector-icons";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import AnswerCard from "../components/AnswerCard";
import { addAnswer, updateUpvote } from "../lib/mutations/questions";
import dayjs from "dayjs";

type QuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SingleQuestion"
>;

type QuestionScreenRouteProp = RouteProp<RootStackParamList, "SingleQuestion">;

type Props = {
  route: QuestionScreenRouteProp;
  navigation: QuestionScreenNavigationProp;
};

//TODO: Replace with actual user data
const user = "7JwLj0rwO1uIkBg5lBZi";
const userName = "Saul GoodMan";

const SingleQuestionScreen = ({ route }: Props) => {
  const tailwind = useTailwind();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reply: "",
    },
  });

  const { questionId } = route.params;

  const [question, setQuestion] = useState<QuestionType | null>();
  const [answers, setAnswers] = useState<AnswerType[] | null>();
  const [voted, setVoted] = useState<boolean>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "questions", questionId), (doc) => {
      setQuestion({ id: doc.id, ...doc.data() } as QuestionType);
    });
    return unsubscribe;
  }, [questionId]);

  useEffect(() => {
    const q = query(
      collection(db, "answers"),
      where("questionId", "==", questionId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data: AnswerType[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as AnswerType);
      });
      setAnswers(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (question && question.upvotes) {
      setVoted(question.upvotes.includes(user));
    }
  }, [question, question?.upvotes, questionId]);

  const onSubmit = async (data: { reply: string }) => {
    const answer: AnswerType = {
      questionId,
      answer: data.reply,
      createdBy: user,
      createdAt: serverTimestamp(),
    };

    reset({
      reply: "",
    });
    await addAnswer(answer);
  };

  const handleUpdateVote = async (
    qid: string,
    id: string,
    type: "add" | "remove"
  ) => {
    await updateUpvote(qid, id, type);
  };

  return (
    <View style={tailwind("p-4 flex")}>
      <Text style={tailwind("text-2xl font-semibold")}>{question?.title}</Text>
      <View style={tailwind("flex flex-row justify-between w-full")}>
        <Text style={tailwind("text-xs pt-1 text-grey-dark")}>
          by {userName}
        </Text>
        <Text style={tailwind("text-xs pt-1 text-grey-dark")}>
          {dayjs(question?.createdAt.toDate()).format("DD-MM-YYYY")}
        </Text>
      </View>
      <View
        style={tailwind(
          "pt-4 pb-6 text-grey-darker flex flex-row items-center"
        )}
      >
        <View style={tailwind("pl-1 pr-6 flex items-center")}>
          <AntDesign
            name={voted ? "like1" : "like2"}
            size={24}
            color="black"
            onPress={() => {
              handleUpdateVote(questionId, user, voted ? "remove" : "add");
            }}
          />

          <Text style={tailwind("text-xs pt-1")}>
            {question?.upvotes.length}
          </Text>
        </View>
        <Text style={tailwind("text-base w-4/5")}>{question?.question}</Text>
      </View>
      <View>
        <Input
          style={tailwind("border p-2 rounded-sm")}
          control={control as any}
          errors={errors}
          name="reply"
          label=""
          placeholder="Add your thoughts here..."
          registerOptions={{
            required: {
              value: true,
              message: "*Required",
            },
          }}
        />
        <Pressable
          style={tailwind(
            "bg-black text-white flex flex-row items-center justify-center py-2 my-3"
          )}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={tailwind("text-white text-lg")}>Post</Text>
        </Pressable>
      </View>
      <View style={tailwind("h-96 pt-2")}>
        <Text style={tailwind("text-lg")}>Answers</Text>
        <ScrollView style={tailwind("pt-1 h-full")}>
          {answers && answers.length > 0 ? (
            answers
              .sort((a, b) =>
                dayjs(
                  a.createdAt && b.createdAt && a.createdAt.toDate()
                ).isBefore(b.createdAt && b.createdAt.toDate())
                  ? 1
                  : -1
              )
              .map((answer) => <AnswerCard key={answer.id} data={answer} />)
          ) : (
            <View style={tailwind("py-8 flex items-center w-full")}>
              <Text>Nothing here yet.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SingleQuestionScreen;
