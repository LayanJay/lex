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
import { getUserById } from "../lib/queries/user";
import { User } from "firebase/auth";
import withProtected from "../hooks/auth/withProtected";
dayjs.extend(relativeTime);

const ViewPollScreen = ({ navigation, route }: any) => {
  // TODO: Replace with actual ID
  const USER_ID = "7JwLj0rwO1uIkBg5lBZi";

  const tailwind = useTailwind();
  const { item } = route.params;

  const [options, setOptions] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [voted, setVoted] = useState(false);
  const [stats, setStats] = useState<any>({});
  const [author, setAuthor] = useState<any[]>();

  useEffect(() => {
    getOptions();
    getAuthor();
    getResponses();
  }, []);

  useEffect(() => {
    console.log(responses?.length, options?.length);
    if (responses?.length > 0 && options?.length > 0) calculateStats();
  }, [options, responses]);

  const getAuthor = async () => {
    let u = await getUserById(item.createdBy);
    setAuthor(u);

    console.log(u);
  };

  const calculateStats = () => {
    console.log("Update");

    let cpy: any = { ...stats };

    responses?.forEach((res) => {
      cpy[res.optionId] = cpy[res.optionId] + 1;
    });

    setStats(cpy);
  };

  const getOptions = () => {
    const ref = collection(db, "poll-options");
    const q = query(ref, where("pollId", "==", item.id));

    let data: any[] = [];
    let optionStats: any = {};
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        optionStats[doc.id] = 0;
        data.push({ id: doc.id, ...doc.data(), count: 0 });
      });
      setOptions(data);
      setStats(optionStats);
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
      <Text style={tailwind("text-4xl font-primary-600")}>{item.topic}</Text>

      <Text style={tailwind("mt-4")}>{item.description}</Text>

      {author && (
        <View
          style={tailwind(
            "w-full mt-6 flex flex-row items-center justify-between "
          )}
        >
          <Text style={tailwind("font-primary-600")}>
            {/* @ts-ignore */}
            By {author.firstname} {author.lastname}
          </Text>
          <Text style={tailwind("font-primary-600")}>{`Ends ${dayjs(
            item.endsOn.toDate()
          ).fromNow()}`}</Text>
        </View>
      )}

      <Text style={tailwind("text-xl mt-12 font-primary-600")}>
        {dayjs().isAfter(dayjs(item.endsOn.toDate()))
          ? "Results"
          : "Cast your vote"}
      </Text>

      {dayjs().isAfter(dayjs(item.endsOn.toDate())) ? (
        <>
          <Text style={tailwind("text-xl font-primary-600")}>
            {responses.length} Total Votes
          </Text>
          <View style={tailwind("mt-6")}>
            {stats &&
              Object.keys(stats).map((key) => (
                <View style={tailwind("mt-2")} key={key}>
                  <Text>
                    {options.find((o) => o.id == key).value} (
                    {((stats[key] / responses.length) * 100).toFixed(1)} %)
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#E7E7E7",
                      height: 30,
                    }}
                  >
                    <View
                      style={{
                        width: `${(stats[key] / responses.length) * 100}%`,
                        backgroundColor: "#000",
                        height: 30,
                      }}
                    ></View>
                  </View>
                </View>
              ))}
          </View>
        </>
      ) : voted ? (
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
          <Text>You have already voted. </Text>
          <Text>
            Poll results will be shown {dayjs(item.endsOn.toDate()).fromNow()}
          </Text>
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default withProtected(ViewPollScreen);