import { uuidv4 } from "@firebase/util";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { useTailwind } from "tailwind-rn";

const CreatePollScreen = ({ navigation, route }: any) => {
  const tailwind = useTailwind();

  const [title, setTitle] = useState("");
  const [answers, setAnswers] = useState([
    {
      id: uuidv4(),
      answer: "",
    },
  ]);

  const createAnswer = () => {
    let temp = [...answers, { id: uuidv4(), answer: "" }];

    setAnswers(temp);
  };

  const PollAnswer = ({ item }: any) => {
    return (
      <View style={{ marginBottom: 5 }}>
        <TextInput
          onChangeText={(value) => {
            let idx = answers.findIndex((ans) => ans.id === item.id);
            let temp = answers.map((val) => {
              if (val.id !== item.id) {
                return {
                  ...val,
                };
              } else {
                return {
                  id: val.id,
                  answer: value,
                };
              }
            });
            setAnswers(temp);
          }}
          placeholder="Answer"
          style={{
            borderWidth: 1,
            borderRadius: 4,
            height: 36,
            paddingHorizontal: 14,
          }}
        />
      </View>
    );
  };

  return (
    <View style={tailwind("p-4")}>
      <Text style={tailwind("text-4xl font-primary-600 mt-4")}>
        Create a poll
      </Text>

      <View style={tailwind("mt-8")}>
        <TextInput
          placeholder="Title"
          onChangeText={setTitle}
          value={title}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            height: 36,
            paddingHorizontal: 14,
          }}
        />

        <TextInput
          placeholder="Description"
          multiline
          numberOfLines={6}
          style={{
            marginTop: 12,
            borderWidth: 1,
            borderRadius: 4,

            paddingHorizontal: 14,
          }}
        />
      </View>

      <View style={tailwind("mt-8")}>
        <Text style={tailwind("font-primary-600 text-lg")}>Poll Answers</Text>

        <FlatList
          data={answers}
          renderItem={PollAnswer}
          keyExtractor={(item) => item.id}
        />

        <Button title="Add" onPress={createAnswer} color="#000" />
      </View>
    </View>
  );
};

export default CreatePollScreen;
