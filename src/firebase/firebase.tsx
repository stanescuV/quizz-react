import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


async function createUser(auth: Auth, email: string, password:string) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode)
  });
}

async function signIn(username: string, password: string){
  return signInWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    // Successful login
    const user = userCredential.user;
    console.log("Logged in successfully:", user);
  })
  .catch((error) => {
    console.error("Login error:", error);
  });
};



export { auth, createUser, signIn };  // Export auth for usage in other files
export default app;
