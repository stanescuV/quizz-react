import { useEffect, useState } from "react";
import { useAuth } from "../firebase/authContext";
import {
    findFormsWithHostId,
    createNewSessionReturnsIdSession,
} from "../firebase/firestore";
import { FormEntity } from "../entities/formDB";
import { useNavigate } from "react-router-dom";

import {DialogShare } from "./DialogShare";

const MyForms = () => {
    const { currentUser } = useAuth();
    const [currentUserForms, setCurrentUserForms] = useState<FormEntity[]>([]);
    const [sessionId, setSessionId] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for controlling the dialog
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            if (currentUser) {
                try {
                    const forms = await findFormsWithHostId(currentUser.uid);
                    setCurrentUserForms(forms);
                } catch (error) {
                    console.error("Error fetching forms:", error);
                }
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
                        <div className="flex flex-col" key={index}>
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={() => navigate("/forms/" + form.id)}
                                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                                >
                                    {form.name}
                                </button>

                                <button
                                    onClick={() => {
                                        createNewSessionReturnsIdSession(form.id).then((r) => {
                                            setSessionId(r);
                                            setIsDialogOpen(true);
                                        });
                                    }}
                                    className="w-50 ml-5 py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-200"
                                >
                                    New Session
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

        <DialogShare sessionId={sessionId} open={isDialogOpen} setOpen={setIsDialogOpen} userUid = {currentUser.uid} />
    </div>
);
};

export default MyForms;
