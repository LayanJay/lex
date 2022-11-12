import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import DataCard from "../DataCard";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { QuestionType } from "../../types";
import QuestionCard from "../QuestionCard";
import DashboardInfo from "../DashboardInfo";
import DashboardQuestionCard from "../DashboardQuestionCard";
import { useAuth } from "../../store";

const UserDashboardScreen = () => {
    const [answeredQuestions, setAnsweredQuestions] = useState<QuestionType[]>();
     const [unansweredQuestions, setUnAnsweredQuestions] = useState<QuestionType[]>();
    const [questions, setQuestions] = useState<QuestionType[]>();
    const [limit, setLimit] = useState<number>(3);
    const user = useAuth((state) => state.user)

    useEffect(() => {
    const getQuestionData = async () => {
    const ref = collection(db, "questions");
    const q = query(ref, where("createdBy", "==", `${user?.uid}`))
    let data: QuestionType[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as QuestionType);
      });
      setQuestions(data);
    }
    const getAnsweredQuestionData = async () => {
    const ref = collection(db, "questions");
    const q = query(ref, where("createdBy", "==", `${user?.uid}`), where("isAnswered", "==", true))
    let data: QuestionType[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as QuestionType);
      });
      setAnsweredQuestions(data);
    }
    const getUnAnsweredQuestionData = async () => {
    const ref = collection(db, "questions");
    const q = query(ref, where("createdBy", "==", `${user?.uid}`), where("isAnswered", "==", false))
    let data: QuestionType[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as QuestionType);
      });
      setUnAnsweredQuestions(data);
    }
    getQuestionData()
    getAnsweredQuestionData()
    getUnAnsweredQuestionData()
    
  }, []);

    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-4")}>
            <DashboardInfo firstname={user?.displayName?.split(' ')[0]} lastname={user?.displayName?.split(' ')[1]} role={user?.role} />
            <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
                {questions && questions?.length ?  <DataCard type="Questions" number={questions?.length} p={`p-6`}/> : <DataCard type="Questions" number={0} p={`p-6`}/>}
               {answeredQuestions && answeredQuestions?.length ? <DataCard type="Answered" number={answeredQuestions?.length} p={`p-6`}/> : <DataCard type="Answered" number={0} p={`p-6`}/>}
                {unansweredQuestions && unansweredQuestions?.length ?  <DataCard type="Unanswered" number={unansweredQuestions?.length} p={`p-6`}/> :  <DataCard type="Unanswered" number={0} p={`p-6`}/>}
               
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Your Questions</Text>
                </View>
                
                    <ScrollView>
        {questions &&
          questions.slice(0, limit).map((question) => (
            <DashboardQuestionCard key={question.id} data={question} />
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
        </View>
    );
};

export default UserDashboardScreen;