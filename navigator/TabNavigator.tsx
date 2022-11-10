import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import AllQuestionsScreen from "../screens/AllQuestionsScreen";
import HomeScreen from "../screens/HomeScreen";
import ListPollsScreen from "../screens/ListPollsScreen";
import LawyerDashboardScreen from "../screens/LawyerDashboardScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import UserDashboardScreen from "../screens/UserDashboardScreen";
import React from "react";

export type TabStackParamList = {
  Home: undefined;
  Forum: undefined;
  Polls: undefined;
  Lawyer: undefined;
  // add other tab types here
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Polls" component={ListPollsScreen} />
      <Tab.Screen name="Forum" component={AllQuestionsScreen} />
      <Tab.Screen name="Lawyer" component={AdminDashboardScreen} />
      {/* Add the other tabs here */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
