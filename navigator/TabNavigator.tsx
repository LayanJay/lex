import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import AllQuestionsScreen from "../screens/AllQuestionsScreen";
import HomeScreen from "../screens/HomeScreen";
import ListPollsScreen from "../screens/ListPollsScreen";
import LawyerDashboardScreen from "../components/dashboards/LawyerDashboardScreen";
import AdminDashboardScreen from "../components/dashboards/AdminDashboardScreen";
import UserDashboardScreen from "../components/dashboards/UserDashboardScreen";
import AnalystDashboardScreen from "../components/dashboards/AnalystDashboardScreen";
import ViewLawyerProfileScreen from "../screens/ViewLawyerProfileScreen";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn/dist";

export type TabStackParamList = {
  Home: undefined;
  Forum: undefined;
  Polls: undefined;
  Profile: undefined;
  // add other tab types here
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "black",
        tabBarStyle: {
          height: 64,
        },
        tabBarActiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color="white" />,
        }}
      />
      <Tab.Screen
        name="Polls"
        component={ListPollsScreen}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="poll" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={AllQuestionsScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="questioncircleo" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AnalystDashboardScreen}
        options={{
          tabBarIcon: () => <Octicons name="person" size={24} color="white" />,
        }}
      />
      {/* Add the other tabs here */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
