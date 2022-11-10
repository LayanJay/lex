import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
dayjs.extend(relativeTime);

const ViewPollScreen = ({ navigation, route }: any) => {
  // TODO: Replace with actual ID
  const USER_ID = "7JwLj0rwO1uIkBg5lBZi";

  const tailwind = useTailwind();
  const { item } = route.params;

  const [options, setOptions] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getOptions();
    getResponses();

    // responses
  }, []);

  const getOptions = () => {
    const ref = collection(db, "poll-options");
    const q = query(ref, where("pollId", "==", item.id));

    let data: any[] = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setOptions(data);
    });
  };

  const getResponses = () => {
    const ref = collection(db, "poll-responses");
    const q = query(ref, where("pollId", "==", item.id));

    let data: any[] = [];
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().userId == USER_ID) setVoted(true);
        data.push({ id: doc.id, ...doc.data() });
      });
      setResponses(data);
    });
  };

  const castVote = async (optId: any) => {
    let ref = doc(collection(db, "poll-responses"));
    let id = ref.id;

    setVoted(true);
    const data = {
      userId: USER_ID,
      pollId: item.id,
      optionId: optId,
    };

    await setDoc(ref, data);
  };

  return (
    <View style={tailwind("p-4")}>
      <Text style={tailwind("py-4")}>View</Text>

      <Text style={tailwind("text-4xl font-primary-600")}>{item.topic}</Text>

      <Text style={tailwind("mt-4")}>{item.description}</Text>

      <View
        style={tailwind(
          "w-full mt-6 flex flex-row items-center justify-between "
        )}
      >
        <Text style={tailwind("font-primary-600")}>By Username</Text>
        <Text style={tailwind("font-primary-600")}>{`Ends ${dayjs(
          item.endsOn.toDate()
        ).fromNow()}`}</Text>
      </View>

      <Text style={tailwind("text-xl mt-12 font-primary-600")}>
        Cast your vote
      </Text>

      {voted ? (
        <View
          style={{
            width: "100%",
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E7E7E7",
            marginTop: 12,
          }}
        >
          <Text>You have already voted</Text>
        </View>
      ) : dayjs().isBefore(dayjs(item.endsOn.toDate())) ? (
        <View style={tailwind("mt-4")}>
          {options && responses ? (
            options.map((op) => (
              <View key={op.id} style={tailwind("mt-2")}>
                <Button
                  onPress={() => castVote(op.id)}
                  title={op.value}
                  color="#000"
                />
              </View>
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      ) : (
        <Text>Fucking TODO</Text>
      )}
    </View>
  );
};

export default ViewPollScreen;
