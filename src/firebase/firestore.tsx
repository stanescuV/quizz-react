import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { FormEntity } from "../entities/formDB";


const addFormDb = async (form: FormEntity) => {

    try{
      const DbFirebaseForms = collection(db, 'forms');
      addDoc(DbFirebaseForms, form)
      .then(()=> console.log("it worked"))

    } catch (err) {
      console.log(err)
    }
  }


export {addFormDb};