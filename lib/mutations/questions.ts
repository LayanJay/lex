import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { AnswerType, QuestionType } from "../../types";

export const createQuestion = async (data: QuestionType) => {
  try {
    const ref = collection(db, "questions");
    const res = await addDoc(ref, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addAnswer = async (data: AnswerType) => {
  try {
    const ref = collection(db, "answers");
    const res = await addDoc(ref, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateIsQuestionAnswered = async (
  id: string,
  isAnswered: boolean
) => {
  try {
    const ref = doc(db, "questions", id);
    const res = await updateDoc(ref, {
      isAnswered: isAnswered,
    });
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

export const deleteQuestion = async (id: string) => {
  try {
    const ref = doc(db, "questions", id);
    const res = await deleteDoc(ref);
    return res;
  } catch (error) {
    console.log(error);
  }
};
