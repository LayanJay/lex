import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { useFonts } from "expo-font";
import { PlayfairDisplay_600SemiBold } from "@expo-google-fonts/playfair-display";

const App = () => {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      // @ts-ignore
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </TailwindProvider>
    );
  }
};

export default App;
