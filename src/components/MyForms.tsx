import { useAuth } from "../firebase/authContext";
import { findFormsWithHostId } from "../firebase/firestore";

// Nu merge fiindca current user se schimba, probabil trebuie use effect
const MyForms = () => {

    const { currentUser } = useAuth();
    


        console.log(currentUser)

    return (<div>MyForms</div>);
};

export default MyForms;
