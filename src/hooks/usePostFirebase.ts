import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface IProps {
  collectionName: string;
  payload: any;
}

const usePostFirebase = async ({ collectionName, payload }: IProps) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), payload);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};

export default usePostFirebase;
