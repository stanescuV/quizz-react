import { useEffect, useState } from "react";
import { useAuth } from "../firebase/authContext";
import { findFormsWithHostId } from "../firebase/firestore";
import { FormEntity } from "../entities/formDB";
import CreateIcon from "@mui/icons-material/Create";
import { blue, purple, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const MyForms = () => {
    const { currentUser } = useAuth();
    const [currentUserForms, setCurrentUserForms] = useState<FormEntity[]>([]);

    //navigation
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            if (currentUser) {
                try {
                    const forms = await findFormsWithHostId(currentUser.uid);
                    console.log(forms);
                    setCurrentUserForms(forms);
                } catch (error) {
                    console.error("Error fetching forms:", error);
                }
            } else {
                console.log("No User Id");
            }
        };

        fetchForms();
    }, [currentUser]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                {currentUserForms.length > 0 ? (
                    <div className="space-y-4">
                        {currentUserForms.map((form, index) => (
                            <div className="flex flex-col" key={index}  >
                                <div className="flex justify-center items-center">
                                    <button onClick={()=>{navigate("/forms/" + form.id )}}
                                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                                    >
                                        {form.name}
                                    </button>

                                    <button className={"" + index}>
                                        <CreateIcon sx={{ color: purple[600] }} className="ml-3 stroke-blue"></CreateIcon>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg font-medium">
                        No forms available
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyForms;
