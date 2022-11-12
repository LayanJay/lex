import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import DataCard from "../DataCard";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { QuestionType } from "../../types";
import QuestionCard from "../QuestionCard";
import DashboardInfo from "../DashboardInfo";
import DashboardVotesCard from "../DashboardVotesCard";
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import dayjs from "dayjs";
import { useAuth } from "../../store";

 dayjs.extend(IsSameOrBefore)

const AnalystDashboardScreen = () => {
    const [polls, setPolls] = useState<any[]>();
    const [limit, setLimit] = useState<number>(3)
    const [inactiveLimit, setInactiveLimit] = useState<number>(3);
    const [activePolls, setActivePolls] = useState<any[]>();
    const [inActivePolls, setInActivePolls] = useState<any[]>();
    const user = useAuth((state) => state.user)
    const [userData, setUserData] = useState<any>()

    useEffect(() => {
    const getPollData = async () => {
    const ref = collection(db, "polls");
    const q = query(ref, where("createdBy", "==", `${user?.uid}`))
    let data: any[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPolls(data);
    }
    getPollData()
    
  }, []);

  useEffect(() => {
    const activePolls = () => {
      setActivePolls(polls?.filter((poll) => dayjs(poll?.endsOn.toDate()).isSameOrBefore(dayjs())))
    }
    const inActivePolls = () => {
      setInActivePolls(polls?.filter((poll) => dayjs(poll?.endsOn.toDate()).isAfter(dayjs())))
    }
   
      activePolls()
      inActivePolls()
    
  }, [polls])

  
    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-4")}>
           <DashboardInfo firstname={user?.displayName?.split(' ')[0]} lastname={user?.displayName?.split(' ')[1]} role={user?.role}/>
            <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
              {polls && polls?.length ? <DataCard type="Polls created" number={polls?.length} p={`p-5`} /> : <DataCard type="Polls created" number={0} p={`p-5`} />}
              {activePolls && activePolls?.length ? <DataCard type="Active Polls" number={activePolls?.length} p={`p-5`}/> : <DataCard type="Active Polls" number={0} p={`p-5`}/>}
                {inActivePolls && inActivePolls?.length ? <DataCard type="Inactive Polls" number={inActivePolls?.length} p={`p-5`}/> : <DataCard type="Inactive Polls" number={0} p={`p-5`}/>}
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Recent Polls</Text>
                </View>
                
                    <ScrollView>
        {polls &&
          polls.filter((poll) => dayjs(poll?.endsOn.toDate()).isSameOrBefore(dayjs())).slice(0, limit).map((poll, i) => (
            <DashboardVotesCard key={i} data={poll} />
          ))}
      </ScrollView>
      {polls && polls?.length > limit ? (
        <View style={tailwind("pt-2 flex flex-row justify-center")}>
            {limit != 3 ? (
                 <Text onPress={() => setLimit(3)} style={tailwind("font-semibold text-sm")}>
                See newer
            </Text>
            ) : ( <Text onPress={() => setLimit(-1)} style={tailwind("font-semibold text-sm")}>
                See older
            </Text>)}
           
        </View>
      ) : ('')}
                
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Inactive Polls</Text>
                </View>
                
                    <ScrollView>
        {polls &&
          polls.filter((poll) => dayjs(poll?.endsOn.toDate()).isAfter(dayjs())).slice(0, inactiveLimit).map((poll, i) => (
            <DashboardVotesCard key={i} data={poll} />
          ))}
      </ScrollView>
                {polls && polls?.length > limit ? (
        <View style={tailwind("pt-2 flex flex-row justify-center")}>
            {inactiveLimit != 3 ? (
                 <Text onPress={() => setInactiveLimit(3)} style={tailwind("font-semibold text-sm")}>
                See newer
            </Text>
            ) : ( <Text onPress={() => setInactiveLimit(-1)} style={tailwind("font-semibold text-sm")}>
                See older
            </Text>)}
           
        </View>
      ) : ('')}
            </View>
        </View>
    );
};

export default AnalystDashboardScreen;