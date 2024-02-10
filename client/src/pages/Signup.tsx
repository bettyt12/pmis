// SignUp.tsx
import React, { useContext, useState } from 'react';
import { error, success } from '../constants';
import { ToastContext } from '../components/Toast/ToastProvider';
import { createContent } from '../adapters/create';
import { signUpEndPoint } from '../adapters/endpoint';

interface SignUpProps {
  onSignUp: (email: string, password: string) => void;
}

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("")
  const [userName, setUserName] = useState('')
  const { handleCreateToast } = useContext(ToastContext);

  const onSuccess = (data: any, response: any) =>{
    handleCreateToast(response.message, success);
    setEmail('');
    setPassword('');
    setName('');
    setUserName('')
  }

  const onFail = (message: string) => handleCreateToast(message, error);
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
      return;
    }
    const userData = {
        email: email,
        password: password,
        username: userName,
        name: name,
      };
    createContent(signUpEndPoint, userData, onSuccess, onFail);
    // onSignUp(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
      <form className="w-full max-w-sm" onSubmit={handleSignUp}>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
