import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

interface IProps {
  collectionName: string;
  documentName: string;
}

const useGetFirebase = async ({ collectionName, documentName }: IProps) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export default useGetFirebase;
