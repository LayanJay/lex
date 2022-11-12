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
import PollConfirmModal from "../components/PollCreateConfirmModal";
import PollErrorModal from "../components/PollErrorModal";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../store";
import withProtected from "../hooks/auth/withProtected";

const CreatePollScreen = ({ navigation, route }: any) => {
  const tailwind = useTailwind();

  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

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

  const validatePoll = () => {
    if (title.length == 0 || description.length == 0) {
      setValidationError("All fields are required");
      return;
    }

    if (answers.length <= 1) {
      setValidationError("You must add at least 2 answers to the poll");
      return;
    }

    if (date < new Date()) {
      setValidationError("Date cannot be from the past");
      return;
    }

    setModalVisible(true);
  };

  const createPoll = async () => {
    setModalVisible(false);

    // add poll
    let ref = doc(collection(db, "polls"));
    let id = ref.id;

    const data = {
      createdBy: user?.uid,
      description: description,
      endsOn: date,
      id: id,
      topic: title,
      createdAt: serverTimestamp(),
    };

    await setDoc(ref, data);

    // add poll

    let answersProm = answers.map(async (answer) => {
      if (answer.answer.length == 0) return;
      let optionsRef = doc(collection(db, "poll-options"));
      let optionsId = optionsRef.id;

      const dataOptions = {
        id: optionsId,
        pollId: id,
        value: answer.answer,
      };

      return await setDoc(optionsRef, dataOptions);
    });

    Promise.all(answersProm).then(() => {
      navigation.goBack();
    });
  };

  return (
    <ScrollView style={tailwind("p-4")}>
      <Text style={tailwind("font-primary-600 text-4xl font-primary-600 mt-4")}>
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
          value={description}
          onChangeText={setDescription}
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
            <View style={tailwind("mt-2")} key={elm.id}>
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
        <Button title="Create Poll" onPress={validatePoll} color="#000000" />
      </View>

      {dateOpen && (
        <DateTimePicker value={date} onChange={onDateChange} mode={"date"} />
      )}

      <PollConfirmModal
        visible={modalVisible}
        onClose={setModalVisible}
        onConfirm={createPoll}
      />

      <PollErrorModal
        visible={!!validationError}
        text={validationError}
        onClose={setValidationError}
      />

      <View style={tailwind("mt-8")}></View>
    </ScrollView>
  );
};

export default withProtected(CreatePollScreen);
