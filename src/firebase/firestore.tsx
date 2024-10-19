import { collection, addDoc, query, getDocs, doc, deleteDoc, where, updateDoc} from 'firebase/firestore';

import { db } from "./firebase";
import { FormEntity } from "../entities/formDB";


//CRUD METHODS 

const formsRef = collection(db, 'forms');

// use this to insert a form in the DB
const addFormDb = async (form: FormEntity) => {

    try{
      const docRef = await addDoc(formsRef, form);
      const id = docRef.id;
      return id

    } catch (err) {
      console.log(err)
    }
  }

// add a method to see the forms added
const findAllForms = async () => { 
  
  const q = query(formsRef, where('host', "==", ""));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

//ex : host : YEfwrMFB2JdVran7Ea4z8sgE7642 --> all forms the user wrote 
const findFormsWithHostId = async (id: string) => { 
  
  const q = query(formsRef, where('host', "==", `${id}`));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

//update 
const updateFormularName = async (idForm: string, newName: string) => {
  const formRef = doc(db, 'forms', idForm);

  await updateDoc(formRef, {name: newName});
}

//delete
const deleteData = async (id: string) => {
  await deleteDoc(doc(db, "forms", `${id}`));
  console.log("data has been deleted ")
}
export {addFormDb, findAllForms, deleteData, findFormsWithHostId, updateFormularName};