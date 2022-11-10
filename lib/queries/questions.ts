import { doc, getDoc } from "firebase/firestore";
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
