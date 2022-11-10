import React from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { useTailwind } from "tailwind-rn";

const ViewPollScreen = ({ navigation, route }: any) => {
  const tailwind = useTailwind();

  const { id } = route.params;

  return (
    <View style={tailwind("p-4")}>
      <Text style={tailwind("py-4")}>View {id}</Text>

      <Text style={tailwind("text-4xl font-primary-600")}>Yada yada yada</Text>

      <Text style={tailwind("mt-4")}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>

      <View
        style={tailwind(
          "w-full mt-6 flex flex-row items-center justify-between "
        )}
      >
        <Text style={tailwind("font-primary-600")}>By Username</Text>
        <Text style={tailwind("font-primary-600")}>2 days ago</Text>
      </View>

      <View style={tailwind("mt-8")}>
        <Button title="Yes" color="#000" />
      </View>

      <View style={tailwind("mt-2")}>
        <Button title="No" color="#000" />
      </View>

      <View style={tailwind("mt-2")}>
        <Button title="Unsure" color="#000" />
      </View>
    </View>
  );
};

export default ViewPollScreen;
