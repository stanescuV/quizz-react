import { useState } from 'react';

function AI() {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    try {
      const response = await fetch('http://localhost:3003/generate-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputText })
      });

      const data = await response.json();
      const formFromResponse = JSON.parse(
        data.form.choices[0].message.content
      ).formular;
      console.log('Formular:', formFromResponse);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-10 flex flex-col justify-center items-center ">
      <h2 className="font-pops font-xl mt-10 mb-10">
        {' '}
        Create your own Promt using AI
      </h2>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your prompt..."
        className="border p-2 rounded-md mr-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}

export default AI;
