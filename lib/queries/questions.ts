import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { QuestionType } from "../../types";

export const getQuestion = async (id: string) => {
  try {
    const ref = doc(db, "questions", id);
    const snap = await getDoc(ref);
    let data: QuestionType | null = null;
    if (snap.exists()) {
      data = { id: snap.id, ...snap.data() } as QuestionType;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async () => {
  try {
    const ref = collection(db, "questions");
    const snap = await getDocs(ref);
    let data: any = [];

    snap.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
