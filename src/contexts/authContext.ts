import { Auth, createUserWithEmailAndPassword } from 'firebase/auth'


function signIn(auth: Auth, email: string, password:string) {
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


export {signIn};