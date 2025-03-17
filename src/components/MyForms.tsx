import { useEffect, useState } from 'react';
import { useAuth } from '../firebase/authContext';
import {
  findFormsWithHostId,
  createNewSessionReturnsIdSession,
  deleteForm
} from '../firebase/firestore';
import { FormEntity } from '../entities/formDB';
import { useNavigate } from 'react-router-dom';

import { DialogShare } from './DialogShare';

const MyForms = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const [currentUserForms, setCurrentUserForms] = useState<FormEntity[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for controlling the dialog

  const navigate = useNavigate();

  const fetchForms = async () => {
    if (currentUser) {
      try {
        const forms = await findFormsWithHostId(currentUser.uid);
        console.log({ forms });
        setCurrentUserForms(forms);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    }
  };


  const deleteFormFromPage = (idForm: string) => {
    //delete form from db

    deleteForm(idForm)
      .then((r) => {
        if (!r) {
          console.log('The form was not deleted from db. ');
          return;
        }
        setCurrentUserForms(
          currentUserForms.filter((form) => form.id !== idForm)
        );
      })
      .catch((err) => {
        //TODO: mecanism de aratar erori cu un banner
        console.log(err);
      });
  };

  useEffect(() => {
   
    fetchForms();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        {currentUser !== null && currentUserForms.length > 0 ? (
          <div className="space-y-4">
            {currentUserForms.map((form, index) => (
              <div className="flex flex-col" key={index}>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => navigate('/forms/' + form.id)}
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

                  <button
                    key={index}
                    onClick={() => {
                      deleteFormFromPage(form.id);
                      setSessionId('');
                      fetchForms();
                    }}
                    className="ml-3 px-5 py-3 rounded-[10px] bg-red-500 hover:bg-red-600 text-white font-extrabold font-['Poppins'] shadow-lg active:shadow-md transition duration-200"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <DialogShare
              sessionId={sessionId}
              open={isDialogOpen}
              setOpen={setIsDialogOpen}
              userUid={currentUser.uid}
            />
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
