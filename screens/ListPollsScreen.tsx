import {
  collection,
  getCountFromServer,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebaseConfig";

const ListPollsScreen = ({ navigation }: any) => {
  const Item = ({ item }: any) => (
    <View style={tailwind("w-full flex flex-row bg-gray-200 rounded-md mb-4")}>
      <View style={tailwind("px-2 py-2 ")}>
        <View
          style={tailwind(
            "w-8 flex items-center justify-center bg-gray-300 py-1 rounded-sm"
          )}
        >
          <Text>{item.count}</Text>
        </View>
      </View>

      <View style={tailwind("flex-grow p-2")}>
        <Text
          textBreakStrategy="balanced"
          onPress={() => navigation.navigate("ViewPoll", { item })}
        >
          {item.topic}
        </Text>
      </View>

      <View style={tailwind("p-3 flex items-center justify-center")}>
        <Text style={{ opacity: 0.5 }} textBreakStrategy="balanced">
          3m
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

      Promise.all(data2).then((dd) => {
        setData(dd);
        setRefreshing(false);
      });
    });
  };

  return (
    <View style={tailwind("p-4")}>
      <Text
        style={tailwind("py-4")}
        onPress={() => navigation.navigate("Create Poll")}
      >
        Recent polls
      </Text>

      <FlatList
        data={data}
        renderItem={Item}
        onRefresh={getData}
        refreshing={refreshing}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListPollsScreen;
