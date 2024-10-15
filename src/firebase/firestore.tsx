import { collection, addDoc, query, where, getDocs} from 'firebase/firestore';

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
export {addFormDb, readData};