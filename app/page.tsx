'use client'
import React, { useState } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://si-llm.ngrok.app/v1/chat/completions';

export default function Home() {
  const [systemMessage, setSystemMessage] = useState('You are a helpful assistant');
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');

  const getCompletionFromMessages = async () => {
    try {
      const data = {
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage },
        ],
      };

      const headers = { 'Content-Type': 'application/json' };
      const apiResponse = await axios.post(API_ENDPOINT, data, { headers });

      if (apiResponse.status === 200) {
        setResponse(apiResponse.data.choices[0].message.content);
      } else {
        setResponse(`Error: ${apiResponse.status} - ${apiResponse.data}`);
      }
    } catch (error) {
      setResponse(`Error`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">AI Assistant</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <label className="text-gray-500 mb-4" htmlFor="systemMessage">System Message: </label>
        <input
          className="flex-1 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          id="systemMessage"
          type="text"
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <label className="text-gray-500 mb-4" htmlFor="userMessage">User Message: </label>
        <input
          className="flex-1 rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          id="userMessage"
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </div>
      <button 
      onClick={getCompletionFromMessages}
      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md margin-top: 10px;"
      >Submit</button>
      <div className="mt-4">
        <h2 className="text-gray-700">AI Response: <span className='text-black'> {response} </span> </h2>
      </div>
    </div>
  );

}