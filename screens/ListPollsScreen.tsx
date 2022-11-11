import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";

// TODO: @Nav: use flat list

const ListPollsScreen = ({ navigation }: any) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("p-4")}>
      <Text
        style={tailwind("py-4")}
        onPress={() => navigation.navigate("Create Poll")}
      >
        Recent polls
      </Text>

      <ScrollView>
        <View
          style={tailwind("w-full flex flex-row bg-gray-200 rounded-md mb-4")}
        >
          <View style={tailwind("px-2 py-2 ")}>
            <View
              style={tailwind(
                "w-8 flex items-center justify-center bg-gray-300 py-1 rounded-sm"
              )}
            >
              <Text>3</Text>
            </View>
          </View>

          <View style={tailwind("flex-grow p-2")}>
            <Text
              textBreakStrategy="balanced"
              onPress={() =>
                navigation.navigate("ViewPoll", { id: "skjhdfksjd" })
              }
            >
              Why does std::vector copy-construct instead of move-construct when
              the destructor may throw? dfsdfg df
            </Text>
          </View>

          <View style={tailwind("p-3 flex items-center justify-center")}>
            <Text style={{ opacity: 0.5 }} textBreakStrategy="balanced">
              3m
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ListPollsScreen;
