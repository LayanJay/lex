import { doc, setDoc } from "firebase/firestore";
import { View, Text, Button } from "react-native";
import { useTailwind } from "tailwind-rn";
import { db } from "../firebaseConfig";

const HomeScreen = () => {
  const tailwind = useTailwind();

  const first = async () => {
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  };

  return (
    <View>
      <Text style={tailwind("py-4 px-2")}>HomeScreen</Text>
      <Button onPress={first} title="test" />
    </View>
  );
};

export default HomeScreen;
