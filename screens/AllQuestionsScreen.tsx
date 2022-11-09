import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

const AllQuestionsScreen = ({ navigation }: any) => {
  const tailwind = useTailwind();
  return (
    <View>
      <Text
        style={tailwind("py-8")}
        onPress={() => navigation.navigate("AddQuestion")}
      >
        All Questions Screen
      </Text>
    </View>
  );
};

export default AllQuestionsScreen;

