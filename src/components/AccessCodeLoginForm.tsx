'use client';

import React, { useState } from 'react';
import { Lock, KeyRound } from 'lucide-react';
import { useAccessCode } from './AccessCodeContext';

// Define the props, including the new 'background' prop
type AccessCodeLoginFormProps = {
  /**
   * An optional ReactNode to render as the background.
   * This is where you would pass <MatrixRain /> or a
   * custom <Starfield /> component.
   */
  background?: React.ReactNode;
};

/**
 * A full-page, themed login form that uses the
 * `useAccessCode` hook to perform authentication.
 */
export function AccessCodeLoginForm({ background }: AccessCodeLoginFormProps) {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useAccessCode(); // Get the login function from the Provider

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(inputCode); // Call the login function
    if (!success) {
      setError('Invalid access code. Please try again.');
      setInputCode('');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
      {/* Render the background prop here.
        If no prop is passed, nothing will be rendered.
      */}
      {background}

      <div className="relative z-10 w-full max-w-md mx-auto bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-700">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-green-900/50 rounded-full mb-6 border border-green-700">
            <Lock className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Access Required
          </h1>
          <p className="text-slate-400 mb-8">
            Please enter the access code to view this page.
          </p>

          <form onSubmit={handleCodeSubmit} className="w-full">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Enter code..."
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all duration-200 focus:ring-4 focus:ring-green-500/50 disabled:bg-slate-600"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

