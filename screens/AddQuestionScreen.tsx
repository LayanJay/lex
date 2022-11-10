import { StackNavigationProp } from "@react-navigation/stack";
import { serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { View, Text, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import Input from "../components/Input";
import { createQuestion } from "../lib/mutations/questions";
import { RootStackParamList } from "../navigator/RootNavigator";

//TODO: Replace with actual user data
const user = "7JwLj0rwO1uIkBg5lBZi";
const userName = "Saul GoodMan";

type AddQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddQuestion"
>;
type Props = {
  navigation: AddQuestionScreenNavigationProp;
};

const AddQuestionScreen = ({ navigation }: Props) => {
  const tailwind = useTailwind();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = async (data: { title: string; description: string }) => {
    const question = {
      title: data.title,
      question: data.description,
      upvotes: [],
      createdBy: user,
      createdAt: serverTimestamp(),
    };
    reset();
    await createQuestion(question);
    navigation.navigate("AllQuestions");
  };
  return (
    <View style={tailwind("pt-4 px-4 h-full")}>
      <Text style={tailwind("text-2xl font-semibold pb-3")}>
        Ask A Question
      </Text>
      <Text style={tailwind("text-grey-main pb-2")}>
        Get your legal questions answered by professionals and members of our
        community. Simply fill in the form below to get started.
      </Text>
      <View style={tailwind("pt-2 h-full flex flex-col")}>
        <Input
          style={tailwind("border p-2 rounded-sm mb-2")}
          labelStyle={tailwind("pb-1")}
          control={control as any}
          errors={errors}
          name="title"
          label="Question Title"
          placeholder="Add a title for your question"
          registerOptions={{
            required: {
              value: true,
              message: "*Required",
            },
          }}
        />
        <Input
          style={tailwind("border p-2 rounded-sm mb-2")}
          inputStyle={tailwind("h-28")}
          labelStyle={tailwind("pb-1")}
          multiline
          control={control as any}
          errors={errors}
          name="description"
          label="Question"
          placeholder="Add a description for your question"
          registerOptions={{
            required: {
              value: true,
              message: "*Required",
            },
          }}
        />
        <Pressable
          style={tailwind(
            "bg-black text-white flex flex-row items-center justify-center py-2 mt-4"
          )}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={tailwind("text-white text-lg")}>Post Question</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddQuestionScreen;
