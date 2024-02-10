// SignIn.tsx
import React, { useContext, useState } from 'react';
import { ToastContext } from '../components/Toast/ToastProvider';
import { error, success } from '../constants';
import { createContent } from '../adapters/create';
import { signInEndPoint } from '../adapters/endpoint';
import { Link, useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

interface SignInProps {
  onSignIn: (email: string, password: string) => void;
}

const SignIn: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { handleCreateToast } = useContext(ToastContext);
  const navigate=useNavigate()
  const onSuccess = (data: any, response: any) =>{
    navigate("/dashboard/patient")
    handleCreateToast(response.message, success);
  }
  
  const onFail = (message: string) => handleCreateToast(message, error);
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (userName.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
      return;
    }
    const userData = {
        username: userName,
        password: password
      };
    createContent(signInEndPoint, userData, onSuccess, onFail);
    // onSignIn(email, password);
    setUserName('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign In</h2>
      <form className="w-full max-w-sm" onSubmit={handleSignIn}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-6">
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
          Sign In
        </button>
      </form>
      <div className="mt-4">
        Don't have an account?{' '}
        <Link to="/signUp" className="text-blue-500 hover:text-blue-800">
          Sign up here
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
