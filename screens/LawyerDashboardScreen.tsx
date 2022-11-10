import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import DataCard from "../components/DataCard";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { QuestionType } from "../types";
import QuestionCard from "../components/QuestionCard";
import DashboardInfo from "../components/DashboardInfo";

const LawyerDashboardScreen = () => {
    const [answers, setAnswers] = useState<any[]>();
    const [questions, setQuestions] = useState<QuestionType[]>();
    const [limit, setLimit] = useState<number>(3)

    useEffect(() => {
    const getQuestionData = async () => {
    const ref = collection(db, "questions");
    const q = query(ref, where("answeredBy", "==", "7JwLj0rwO1uIkBg5lBZi"))
    let data: QuestionType[] = [];
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as QuestionType);
      });
      setQuestions(data);
    }
    getQuestionData()
    
  }, []);

    const tailwind = useTailwind();

    return (
        <View style={tailwind("p-4")}>
             <DashboardInfo firstname="Saul" lastname="Goodman" role="Lawyer"/>
            <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
                <DataCard type="Answers" number={23}/>
                <DataCard type="Votes" number={23}/>
                <DataCard type="Visits" number={23}/>
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl")}>Recently answered</Text>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Questions</Text>
                </View>
                
                    <ScrollView>
        {questions &&
          questions.slice(0, limit).map((question) => (
            <QuestionCard key={question.id} data={question} />
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
        {questions &&
          questions.map((question) => (
            <QuestionCard key={question.id} data={question} />
          ))}
      </ScrollView>
                
            </View>
        </View>
    );
};

export default LawyerDashboardScreen;