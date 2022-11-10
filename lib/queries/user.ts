import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const getUserById = async (id: string) => {
  try {
    const ref = doc(db, "user", id);
    const snap = await getDoc(ref);
    let data: any = null;
    if (snap.exists()) {
      data = { id: snap.id, ...snap.data() };
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
