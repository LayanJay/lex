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
import DashboardQuestionCard from "../DashboardQuestionCard";
import { async } from "@firebase/util";
import DashboardVotesCard from "../DashboardVotesCard";
import { useAuth } from "../../store";

const LawyerDashboardScreen = () => {
    const [answers, setAnswers] = useState<any[]>();
    const [questions, setQuestions] = useState<any[]>();
    const [limit, setLimit] = useState<number>(3);
    const [votelimit, setVoteLimit] = useState<number>(3);
    const [polls, setPolls] = useState<any[]>();
    const [votes, setVotes] = useState<any[]>();
    const user = useAuth((state) => state.user)


    useEffect(() => {
    const getAnswers = async () => {
    const ref = collection(db, "answers");
    const q = query(ref, where("createdBy", "==", `${user?.uid}`))
    let data: any[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAnswers(data);
      console.log('ansss', answers);
    }
    getAnswers()
  }, []);

  useEffect(() => {
    const getQuestionData = async () => {
      answers?.map(async(ans) => {
        console.log('id', ans);
        const docRef = doc(db, "questions", `${ans?.questionId}`);
      const docSnap = await getDoc(docRef);
      let data: any[] = [];
      if(docSnap.exists()){
        data.push(docSnap.data())
        console.log("dataaa", data)
        setQuestions(data)
      }
      else{
        console.log("Nothing");
      }
      })
      
      }
      if(answers && answers?.length){
        getQuestionData()
      }
  }, [answers])

  useEffect(() => {
    const getPollData = async () => {
      const ref = collection(db, "poll-responses");
    const q = query(ref, where("userId", "==", `${user?.uid}`))
    let data: any[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPolls(data);
      console.log('ansss', polls);
    }
    getPollData()
  }, [])

  useEffect(() => {
    const getVoteData = async() => {
      polls?.map(async(poll) => {
        console.log('id', poll);
        const docRef = doc(db, "polls", `${poll?.pollId}`);
      const docSnap = await getDoc(docRef);
      let data: any[] = [];
      if(docSnap.exists()){
        data.push(docSnap.data())
        console.log("dataaa", data)
        setVotes(data)
      }
      else{
        console.log("Nothing");
      }
      })
      
      }
      getVoteData()
  }, [polls])

  console.log("votes", votes);
  console.log("ans", answers);
  
  

    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-4")}>
             <DashboardInfo firstname={user?.displayName?.split(' ')[0]} lastname={user?.displayName?.split(' ')[1]} role={user?.role} />
            <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
              {answers && answers?.length ? <DataCard type="Answers" number={answers?.length} p={`p-6`}/> : <DataCard type="Answers" number={0} p={`p-6`}/>}
                {polls && polls?.length ? <DataCard type="Votes" number={polls?.length} p={`p-7`}/> : <DataCard type="Votes" number={0} p={`p-7`}/>}
                <DataCard type="Visits" number={23} p={`p-7`}/>
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl")}>Recently answered</Text>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Questions</Text>
                </View>
                
                    <ScrollView>
        {questions &&
          questions.slice(0, limit).map((question, i) => (
            <DashboardQuestionCard key={i} data={question} />
          ))}
      </ScrollView>
      {questions && questions?.length > limit ? (
        <View style={tailwind("pt-2 flex flex-row justify-center")}>
            {limit != 3 ? (
                 <Text onPress={() => setLimit(3)} style={tailwind("font-semibold text-sm")}>
                View less
            </Text>
            ) : ( <Text onPress={() => setLimit(-1)} style={tailwind("font-semibold text-sm")}>
                View more
            </Text>)}
           
        </View>
      ) : ('')}
                
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Casted Votes</Text>
                </View>
                
                    <ScrollView>
        {votes &&
          votes?.slice(0, votelimit).map((vote, i) => (
            <DashboardVotesCard key={i} data={vote}/>
          ))}
      </ScrollView>
                      {votes && votes?.length > votelimit ? (
        <View style={tailwind("pt-2 flex flex-row justify-center")}>
            {votelimit != 3 ? (
                 <Text onPress={() => setVoteLimit(3)} style={tailwind("font-semibold text-sm")}>
                View less
            </Text>
            ) : ( <Text onPress={() => setVoteLimit(-1)} style={tailwind("font-semibold text-sm")}>
                View more
            </Text>)}
           
        </View>
      ) : ('')}
            </View>
        </View>
    );
};

export default LawyerDashboardScreen;