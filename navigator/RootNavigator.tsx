import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import CreatePollScreen from "../screens/CreatePollScreen";
import SignIn from "../screens/SignIn";
import ViewPollScreen from "../screens/ViewPollScreen";
import TabNavigator from "./TabNavigator";
import React from "react";
import AllQuestionsScreen from "../screens/AllQuestionsScreen";
import SingleQuestionScreen from "../screens/SingleQuestionScreen";

export type RootStackParamList = {
  Main: undefined;
  Modal: {
    userId: string;
    name: string;
  };
  AddQuestion: undefined;
  AddQuestion1: undefined;
  AllQuestions: undefined;
  SingleQuestion: { questionId: string };
  SignIn: undefined;
  //   add the other types for the pages
};

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
        <RootStack.Screen name="ViewPoll" component={ViewPollScreen} />
        <RootStack.Screen name="Create Poll" component={CreatePollScreen} />
        <RootStack.Screen
          name="AddQuestion"
          component={AddQuestionScreen}
          options={{ title: "Forum" }}
        />
        <RootStack.Screen name="AllQuestions" component={AllQuestionsScreen} />
        {/* <RootStack.Screen
          name="SingleQuestion"
          component={SingleQuestionScreen}
          options={{ title: "Forum" }}
        /> */}
        <RootStack.Screen name="Sign In" component={SignIn} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
