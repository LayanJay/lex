import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import DataCard from "../components/DataCard";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { QuestionType } from "../types";
import QuestionCard from "../components/QuestionCard";

const UserDashboardScreen = () => {
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
            <View style={tailwind("flex flex-row justify-between")}>
                <View>
                    <Text style={tailwind("text-2xl font-semibold")}>Dashboard</Text>
                    <Text style={tailwind("text-lg text-gray-400")}>Neethi Wikurthisinghe</Text>
                    <View style={tailwind("bg-gray-400 flex flex-row justify-center")}>
                        <Text style={tailwind("text-xs font-light ")}>User</Text>
                    </View>
                </View>
                <View>
                    <Text>Image</Text>
                </View>
                
            </View>
            <View style={tailwind("mt-10 flex flex-row justify-evenly")}>
                <DataCard type="Questions" number={23}/>
                <DataCard type="Answered" number={23}/>
                <DataCard type="Unanswered" number={23}/>
            </View>
            <View style={tailwind("mt-14")}>
                <View>
                    <Text style={tailwind("font-semibold text-xl pb-3")}>Your Questions</Text>
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
        </View>
    );
};

export default UserDashboardScreen;