import {
  collection,
  getCountFromServer,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Pressable,
  SectionList,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebaseConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../store";
dayjs.extend(relativeTime);

const ListPollsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  console.log(user);

  const Item = ({ item }: any) => (
    <View style={tailwind("w-full flex flex-row bg-gray-200 rounded-md mb-4")}>
      <View style={tailwind("px-2 py-2 flex justify-center")}>
        <View
          style={tailwind(
            "w-8 flex items-center justify-center bg-gray-300 py-1 rounded-md"
          )}
        >
          <Text>{item.count}</Text>
        </View>
      </View>

      <View style={tailwind("flex-grow p-2 flex justify-center")}>
        <Text
          style={{ maxWidth: 260 }}
          textBreakStrategy="balanced"
          onPress={() => navigation.navigate("ViewPoll", { item })}
        >
          {item.topic}
        </Text>
      </View>

      <View style={tailwind("p-3 flex items-center justify-center")}>
        <Text
          style={{ opacity: 0.5, width: 50, fontSize: 12 }}
          textBreakStrategy="balanced"
        >
          {`${
            dayjs().isBefore(dayjs(item.endsOn.toDate())) ? "Ends" : "Ended"
          } ${dayjs(item.endsOn.toDate()).fromNow()}`}
        </Text>
      </View>
    </View>
  );

  const tailwind = useTailwind();

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setRefreshing(true);

    getDocs(collection(db, "polls")).then((snap) => {
      let data2 = snap.docs.map(async (v) => {
        const collection_ = collection(db, "poll-responses");
        const query_ = query(collection_, where("pollId", "==", v.id));
        const snapshot = await getCountFromServer(query_);
        snapshot.data().count;

        return {
          id: v.id,
          count: snapshot.data().count,
          ...v.data(),
        };
      });

      Promise.all(data2).then((dd: any) => {
        const fml = [
          {
            title: "Ongoing Polls",
            data: dd.filter((poll: any) =>
              dayjs().isBefore(dayjs(poll.endsOn.toDate()))
            ),
          },
          {
            title: "Ended Polls",
            data: dd.filter((poll: any) =>
              dayjs().isAfter(dayjs(poll.endsOn.toDate()))
            ),
          },
        ];

        console.log(fml);
        setData(fml);
        setRefreshing(false);
      });
    });
  };

  return (
    <View style={tailwind("p-4 h-full relative")}>
      <View>
        <SectionList
          sections={[...data]}
          onRefresh={getData}
          refreshing={refreshing}
          keyExtractor={(item, index) => item + index}
          renderItem={Item}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={tailwind("py-4 font-primary-600 text-xl")}>
              {title}
            </Text>
          )}
        />
      </View>
      {/* @ts-ignore */}
      {user && user.role == "analyst" && (
        <View style={tailwind("absolute bottom-0 right-0 mx-3 my-3 z-20")}>
          <Pressable
            onPress={() => navigation.navigate("Create Poll")}
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
      )}
    </View>
  );
};

export default ListPollsScreen;
