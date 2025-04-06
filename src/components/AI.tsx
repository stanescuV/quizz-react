import { useState } from 'react';
import { Input } from './shadcn-components/input';

function AI() {
  const [inputText, setInputText] = useState('');

  const serverURL = import.meta.env.VITE_HTTP_SERVER_URL

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    try {
      fetch(`${serverURL}/generate-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputText })
      })
        .then((r) => {
          console.log(r.status);
          if (r.status !== 200) {
            console.log('Bad Query');
            window.alert(
              'Please insert a valid request in order to recive a form.'
            );
            return;
          }

          return r.json();
        })
        .then((rr) => {
          console.log({ rr });
          //TODO: entity
          const data = rr as any;
          const formFromResponse = JSON.parse(
            data.form.choices[0].message.content
          ).formular;
          console.log('Formular:', formFromResponse);
        });
    } catch (error) {
      console.error('Error :', error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center ">
      <h2 className="font-pops font-xl mt-10 mb-10">
        {' '}
        Create your own Promt using AI
      </h2>
      <div className="w-1/2 flex justify-center items-center mb-4">
        <Input
          style={{ backgroundColor: 'white' }}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your prompt..."
          className="border  rounded-md mr-2"
        ></Input>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AI;
