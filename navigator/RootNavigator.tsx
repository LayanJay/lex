import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddQuestionScreen from "../screens/AddQuestionScreen";
import CreatePollScreen from "../screens/CreatePollScreen";
import SignIn from "../screens/SignIn";
import ViewPollScreen from "../screens/ViewPollScreen";
import TabNavigator from "./TabNavigator";
import React from "react";
import AllQuestionsScreen from "../screens/AllQuestionsScreen";
import SingleQuestionScreen from "../screens/SingleQuestionScreen";
import SignUp from "../screens/SignUp";
import SignUpLawyer from "../screens/SignUpLawyer";
import SignUpAnalyst from "../screens/SignUpAnalyst";

export type RootStackParamList = {
  Main: undefined;
  Modal: {
    userId: string;
    name: string;
  };
  AddQuestion: undefined;
  AddQuestion1: undefined;
  AllQuestions: undefined;
  "Sign In": undefined;
  "Sign Up": undefined;
  SignUpLawyer: undefined;
  SignUpAnalyst: undefined;
  SingleQuestion: {
    questionId: string;
  };
  //   add the other types for the pages
};

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Main" component={TabNavigator} />
        <RootStack.Screen
          name="ViewPoll"
          component={ViewPollScreen}
          options={{ title: "View Poll" }}
        />
        <RootStack.Screen
          name="Create Poll"
          component={CreatePollScreen}
          options={{ title: "Create Poll" }}
        />
        <RootStack.Screen
          name="AddQuestion"
          component={AddQuestionScreen}
          options={{ title: "Forum" }}
        />
        <RootStack.Screen name="AllQuestions" component={AllQuestionsScreen} />
        <RootStack.Screen
          name="SingleQuestion"
          component={SingleQuestionScreen}
          options={{ title: "Forum" }}
        />
        <RootStack.Screen name="Sign In" component={SignIn} />
        <RootStack.Screen name="Sign Up" component={SignUp} />
        <RootStack.Screen
          name="SignUpLawyer"
          component={SignUpLawyer}
          options={{ title: "Sign Up as a Lawyer" }}
        />
        <RootStack.Screen
          name="SignUpAnalyst"
          component={SignUpAnalyst}
          options={{ title: "Sign Up as an Analyst" }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
