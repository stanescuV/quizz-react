import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { FormEntity } from "../entities/formDB";


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


export {addFormDb};