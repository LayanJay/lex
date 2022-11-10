import { uuidv4 } from "@firebase/util";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreatePollScreen = ({ navigation, route }: any) => {
  const tailwind = useTailwind();

  const [title, setTitle] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
  const [date, setDate] = useState(new Date());
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

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    setDateOpen(false);
    setDate(currentDate);
  };

  const createPoll = () => {
    console.log("FK U");
  };

  return (
    <ScrollView style={tailwind("p-4")}>
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

        {answers &&
          answers.map((elm) => (
            <View style={tailwind("mt-2")}>
              <TextInput
                blurOnSubmit={false}
                value={answers.find((ans) => ans.id === elm.id)?.answer}
                onChangeText={(value) => {
                  let temp = answers.map((val) => {
                    if (val.id !== elm.id) {
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
          ))}

        <View style={tailwind("mt-2")}>
          <Button title="Add" onPress={createAnswer} color="#000" />
        </View>
      </View>

      <Text style={tailwind("mt-8 font-primary-600 text-lg")}>
        Poll end date
      </Text>

      <Text style={tailwind("mt-2 ")}>
        {date.toString().split("(India")[0]}
      </Text>

      <View style={tailwind("mt-4")}>
        <Button
          title="Select End Date"
          onPress={() => setDateOpen(true)}
          color="#636363"
        />
      </View>

      <View style={tailwind("mt-8")}>
        <Button title="Create Poll" onPress={createPoll} color="#000000" />
      </View>

      {dateOpen && (
        <DateTimePicker value={date} onChange={onDateChange} mode={"date"} />
      )}
    </ScrollView>
  );
};

export default CreatePollScreen;
