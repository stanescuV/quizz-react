import { collection, addDoc, query, getDocs, doc, deleteDoc} from 'firebase/firestore';

import { db } from "./firebase";
import { FormEntity } from "../entities/formDB";


//CRUD METHODS 


// use this to insert a form in the DB
const addFormDb = async (form: FormEntity) => {

    try{
      const DbFirebaseForms = collection(db, 'forms');
      const docRef = await addDoc(DbFirebaseForms, form);
      const id = docRef.id;
      return id

    } catch (err) {
      console.log(err)
    }
  }

// add a method to see the forms added
const readData = async () => { 
    
  const q = query(collection(db, "forms"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

//delete
const deleteData = async (id: string) => {
  await deleteDoc(doc(db, "forms", `${id}`));
  console.log("data has been deleted ")
}
export {addFormDb, readData, deleteData};