import { collection, getDocs } from "firebase/firestore";
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
