import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getPolls = async () => {
  try {
    const ref = collection(db, "polls");
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

export const getPollAnswers = async (id: string) => {
  try {
    const ref = collection(db, "poll-options");
    const q = query(ref, where("pollId", "==", id));
    const snap = await getDocs(q);
    let data: any[] = [];
    snap.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getResponseCount = async (id: string) => {
  try {
    const ref = collection(db, "poll-responses");
    const q = query(ref, where("pollId", "==", id));
    const snap = await getCountFromServer(q);
    return snap.data().count;
  } catch (error) {
    console.log(error);
  }
};
