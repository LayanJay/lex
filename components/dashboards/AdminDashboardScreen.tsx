import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import DataCard from "../DataCard";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { QuestionType } from "../../types";
import QuestionCard from "../QuestionCard";
import LawyerCard from "../LawyerCard";
import DashboardInfo from "../DashboardInfo";
import { useAuth } from "../../store";

const AdminDashboardScreen = () => {
  const [notApprovedLawyers, setNotApprovedLawyers] = useState<any[]>();
  const [approvedLawyers, setApprovedLawyers] = useState<any[]>();
  const [allUsers, setAllUsers] = useState<any[]>();
  const [analysts, setAnalysts] = useState<any[]>();
  const [lawyers, setLawyers] = useState<any[]>();
  const [limit, setLimit] = useState<number>(3);
  const user = useAuth((state) => state.user)

  useEffect(() => {
    //get approved lawyers
    const getApprovedLawyerData = async () => {
      const ref = collection(db, "users");
      const q = query(
        ref,
        where("role", "==", "lawyer"),
        where("approved", "==", true)
      );
      let data: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setApprovedLawyers(data);
    };
    //get not approved lawyers
    const getNotApprovedLawyerData = async () => {
      const ref = collection(db, "users");
      const q = query(
        ref,
        where("role", "==", "lawyer"),
        where("approved", "==", false)
      );
      let data: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setNotApprovedLawyers(data);
    };
    //get all users
    const getAllUsers = async () => {
      const ref = collection(db, "users");
      const querySnapshot = await getDocs(ref);
      let data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAllUsers(data);
    };
    //get analysts
    const getAnalysts = async () => {
      const ref = collection(db, "users");
      const q = query(ref, where("role", "==", "analyst"));
      let data: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAnalysts(data);
    };
    //get lawyers
    const getLawyers = async () => {
      const ref = collection(db, "users");
      const q = query(ref, where("role", "==", "lawyer"));
      let data: any[] = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setLawyers(data);
    };
    getApprovedLawyerData();
    getNotApprovedLawyerData();
    getAllUsers();
    getAnalysts();
    getLawyers();
  }, []);

  console.log("appr", approvedLawyers);

  const tailwind = useTailwind();

  return (
    <View style={tailwind("p-4")}>
      <DashboardInfo role="Admin" firstname="Ravi" lastname="Adminrathne" />

      <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
        {allUsers && allUsers?.length ? (
          <DataCard type="Total users" number={allUsers?.length} p={`p-6`} />
        ) : (
          <DataCard type="Total users" number={0} p={`p-6`} />
        )}
        {analysts && analysts?.length ? (
          <DataCard type="Analysts" number={analysts?.length} p={`p-6`} />
        ) : (
          <DataCard type="Analysts" number={0} p={`p-6`} />
        )}
        {lawyers && lawyers?.length ? (
          <DataCard type="Lawyers" number={lawyers?.length} p={`p-6`} />
        ) : (
          <DataCard type="Lawyers" number={0} p={`p-6`} />
        )}
      </View>
      <View style={tailwind("mt-14")}>
        <View>
          <Text style={tailwind("font-semibold text-xl")}>Newly approved</Text>
          <Text style={tailwind("font-semibold text-xl pb-3")}>Lawyers</Text>
        </View>

        <ScrollView>
          {approvedLawyers &&
            approvedLawyers
              .slice(0, limit)
              .map((lawyer) => <LawyerCard key={lawyer.id} data={lawyer} />)}
        </ScrollView>
        {approvedLawyers && approvedLawyers?.length > limit ? (
          <View style={tailwind("pt-2 flex flex-row justify-center")}>
            {limit != 3 ? (
              <Text
                onPress={() => setLimit(3)}
                style={tailwind("font-semibold text-sm")}
              >
                See less
              </Text>
            ) : (
              <Text
                onPress={() => setLimit(-1)}
                style={tailwind("font-semibold text-sm")}
              >
                See more
              </Text>
            )}
          </View>
        ) : (
          ""
        )}
      </View>
      <View style={tailwind("mt-14")}>
        <View>
          <Text style={tailwind("font-semibold text-xl")}>
            Approval pending
          </Text>
          <Text style={tailwind("font-semibold text-xl pb-3")}>Lawyers</Text>
        </View>

        <ScrollView>
          {notApprovedLawyers &&
            notApprovedLawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} data={lawyer} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminDashboardScreen;
