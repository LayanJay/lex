import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import DataCard from "../components/DataCard";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { QuestionType } from "../types";
import QuestionCard from "../components/QuestionCard";
import LawyerCard from "../components/LawyerCard";
import DashboardInfo from "../components/DashboardInfo";

const AdminDashboardScreen = () => {
    const [notApprovedLawyers, setNotApprovedLawyers] = useState<any[]>();
    const [approvedLawyers, setApprovedLawyers] = useState<any[]>();
    const [limit, setLimit] = useState<number>(3)

    useEffect(() => {
    const getApprovedLawyerData = async () => {
    const ref = collection(db, "user");
    const q = query(ref, where("role", "==", "lawyer"), where("approved", "==", true))
    let data: any[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });
      setApprovedLawyers(data);
    }
    const getNotApprovedLawyerData = async () => {
    const ref = collection(db, "user");
    const q = query(ref, where("role", "==", "lawyer"), where("approved", "==", false))
    let data: any[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      });
      setNotApprovedLawyers(data);
    }
    getApprovedLawyerData()
    getNotApprovedLawyerData()
    
  }, []);

  console.log("appr", approvedLawyers)

    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-4")}>
            <DashboardInfo role='Admin' firstname="Ravi" lastname="Adminrathne"/>
            
            <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
                <DataCard type="Total users" number={23}/>
                <DataCard type="Analysts" number={23}/>
                <DataCard type="Lawyers" number={23}/>
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl")}>Newly approved</Text>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Lawyers</Text>
                </View>
                
                    <ScrollView>
        {approvedLawyers &&
          approvedLawyers.slice(0, limit).map((lawyer) => (
            <LawyerCard key={lawyer.id} data={lawyer} />
          ))}
      </ScrollView>
      {approvedLawyers && approvedLawyers?.length > limit ? (
        <View style={tailwind("pt-2 flex flex-row justify-center")}>
            {limit != 3 ? (
                 <Text onPress={() => setLimit(3)} style={tailwind("font-semibold text-sm")}>
                See less
            </Text>
            ) : ( <Text onPress={() => setLimit(-1)} style={tailwind("font-semibold text-sm")}>
                See more
            </Text>)}
           
        </View>
      ) : ('')}
                
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl")}>Approval pending</Text>
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