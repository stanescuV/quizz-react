import { collection, addDoc, query, getDocs, doc, deleteDoc, where, updateDoc, getDoc} from 'firebase/firestore';

import { db } from "./firebase";
import { FormEntity } from "../entities/formDB";
import { Session } from '../entities/session';



//CRUD METHODS 

const formsRef = collection(db, 'forms');
const sessionsRef = collection(db, 'sessions');
const sessionCodes8Digits = collection(db, 'sessionsCodes8Digits');


// use this to insert a form in the DB
/** it inserts in the DB, forms in firestore
 * and returns the idSession of the inserted doc
 * 
 * 
 */
const addFormDb = async (form: FormEntity) => {

    try{
  
      const insertedForm = await addDoc(formsRef, form);
      
      const sessionId = createNewSessionReturnsIdSession(insertedForm.id);


      return sessionId;

    } catch (err) {
      console.log(err)
    }
}


const createNew8DigitsCodeSession = async (code:{}) =>{

  try{
    await addDoc(sessionCodes8Digits, code);
    console.log('session created !! ')
  } catch (err){
    //TODO: error handling on client side 
    window.alert(err);
    console.log({err});
  }
  

}


  /**
   * takes a string formId and returns the Id of the session so we can connect to the session
   * @param formId 
   * @returns Id of the inserted session
   */
const createNewSessionReturnsIdSession = async (formId: string) =>{

  const session: Session = { 
    idForm: formId, 
    date: (new Date).toISOString(),
    answers: []
  }

  const insertedSession = await addDoc(sessionsRef, session);
  console.log('session created !! ', insertedSession.id)
  return insertedSession.id

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
//TODO: collection with []arrays so O(1)    [at insert time]
const findFormsWithHostId = async (id: string): Promise<FormEntity[]> => {
  const q = query(formsRef, where("host", "==", id));
  const arrayOfForms: FormEntity[] = [];
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    // Ensure the data matches FormEntity
    arrayOfForms.push(data as FormEntity);
  });

  return arrayOfForms;
};

const findFormWithFormId = async (idForm: string) => {
  const formRef = doc(db, 'forms', idForm);
  const docSnap = await getDoc(formRef);
  // console.log(docSnap)
  console.log(docSnap.data())
  return docSnap.data();
}

/**
 * takes id session and returns session
 */
const readSessionUUIDWith8DigitCode = async (code8Digits: string) => {
  const sessionCodesRef = doc(db, 'sessions', code8Digits);
  const docSnap = await getDoc(sessionCodesRef);
  // console.log(docSnap.data());
  return docSnap.data();
}

/**
 * takes id session and returns session
 */
const readSessionWithId = async (idSession: string) => {
  const sessionRef = doc(db, 'sessions', idSession);
  const docSnap = await getDoc(sessionRef);
  // console.log(docSnap.data());
  return docSnap.data();
}

/**
 * takes id session and returns session.answer
 */
const readSessionWithIdReturnsAnswers = async (idSession: string | undefined) => {
  if(!idSession){
    return [];
  }

  const sessionRef = doc(db, 'sessions', idSession);
  const docSnap = await getDoc(sessionRef);
  const answers = (docSnap.data())?.answers || undefined;
  console.log('firestore answers',answers);
  return answers;
}


/**
 * takes id session and returns form
 */
const readFormularWithSessionId = async (idSession: string) => {

  // we get the session using the sessionId
  const session = await readSessionWithId(idSession); 
  
  //we get the form id from the session
  const formId = session?.idForm;
  const formRef = doc(db, 'forms', formId);
  
  //we get the form 
  const form = await getDoc(formRef);

  console.log(form.data());
  return form.data();
  
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
export {addFormDb, findAllForms, deleteData, createNew8DigitsCodeSession, readSessionUUIDWith8DigitCode, findFormsWithHostId, updateFormularName, readFormularWithSessionId , readSessionWithIdReturnsAnswers, findFormWithFormId, createNewSessionReturnsIdSession};