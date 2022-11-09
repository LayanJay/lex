import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

const HomeScreen = () => {
  const tailwind = useTailwind();

  return (
    <View>
      <Text style={tailwind("py-2 px-2")}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
