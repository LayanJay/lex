import { PlayfairDisplay_600SemiBold } from "@expo-google-fonts/playfair-display";
import { useFonts } from "expo-font";
import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import Logo from "../assets/logo.png";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import React from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type Props = {
    lawyerId: string;
}

const ViewLawyerProfileScreen = ({lawyerId}: Props) => {
    const [lawyer, setLawyer] = useState<any>()


    useEffect(() => {
        const getLawyerData = async() =>{
             const docRef = doc(db, "user", "7JwLj0rwO1uIkBg5lBZi");
        const docSnap = await getDoc(docRef);
       
        if(docSnap.exists()){
            setLawyer(docSnap.data())
        }else{
           console.log("ehema ekek nathoo");
           
        }
        }
        getLawyerData()
    }, [])

    console.log("laww", lawyer);
    

    const tailwind = useTailwind()
    let [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
  });
 if (!fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={tailwind("py-4 px-4 bg-white h-full")}>
        <View style={tailwind("flex items-center justify-center")}>
          <Image style={tailwind("mb-6")} source={Logo} />
          <Text style={tailwind("font-primary-600 font-semibold text-4xl")}>
            Profile
          </Text>
        </View>
        <View style={tailwind("mt-6")}>
            <View style={tailwind("bg-gray-200 flex items-center")}>
                <Text style={tailwind("px-2 py-3 text-lg ")}>{lawyer?.firstname} {lawyer?.lastname}</Text>
            </View>
            <View style={tailwind("mt-2")}></View>
            <View style={tailwind("bg-gray-200 flex items-center")}>
                <Text style={tailwind("px-2 py-3 text-lg ")}>{lawyer?.email}</Text>
            </View>
            <View style={tailwind("mt-2")}></View>
            <View style={tailwind("bg-gray-200 flex items-center")}>
                <Text style={tailwind("px-2 py-3 text-lg ")}>{lawyer?.lawFirm}</Text>
            </View>
            <View style={tailwind("mt-2")}></View>
            <View style={tailwind("bg-gray-200 flex items-center")}>
                <Text style={tailwind("px-2 py-3 text-lg ")}>{lawyer?.qualification}</Text>
            </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ViewLawyerProfileScreen