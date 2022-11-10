import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { AnswerType } from "../../types";

export const addAnswer = (data: AnswerType) => {
  try {
    const ref = collection(db, "answers");
    const res = addDoc(ref, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUpvote = async (
  qid: string,
  id: string,
  type: "add" | "remove"
) => {
  try {
    const ref = doc(db, "questions", qid);
    if (type === "add") {
      const res = await updateDoc(ref, {
        upvotes: arrayUnion(id),
      });
      return res;
    } else {
      const res = await updateDoc(ref, {
        upvotes: arrayRemove(id),
      });
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
