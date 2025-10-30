'use client';

import React, { useState, ReactNode } from 'react';
import { Lock, KeyRound } from 'lucide-react';
import { useAccessCode } from './AccessCodeContext';
import { cn } from '../lib/utils'; 

type AccessCodeLoginFormProps = {
  /** A custom background component, e.g., <MatrixRain />. */
  background?: ReactNode;

  /** Override text content. */
  title?: string;
  subtitle?: string;
  buttonText?: string;
  placeholder?: string;
  errorText?: string;

  /** Override default Tailwind classes. */
  wrapperClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  errorClassName?: string;
};

/**
 * A full-page, themed login form that uses the
 * `useAccessCode` hook to perform authentication.
 */
export function AccessCodeLoginForm({
  background,
  title = 'Access Required',
  subtitle = 'Please enter the access code to view this page.',
  buttonText = 'Unlock',
  placeholder = 'Enter code...',
  errorText = 'Invalid access code. Please try again.',
  wrapperClassName,
  titleClassName,
  subtitleClassName,
  inputClassName,
  buttonClassName,
  errorClassName,
}: AccessCodeLoginFormProps) {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const { login } = useAccessCode();

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(inputCode);
    if (!success) {
      setError(errorText);
      setInputCode('');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
      {/* This is the correct refactor:
        MatrixRain is gone, and the background prop is rendered.
      */}
      {background}

      {/* Use cn() to merge default and provided classes */}
      <div
        className={cn(
          'relative z-10 w-full max-w-md mx-auto bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-700',
          wrapperClassName
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-green-900/50 rounded-full mb-6 border border-green-700">
            <Lock className="h-10 w-10 text-green-400" />
          </div>

          {/* Use text props and cn() for titles */}
          <h1
            className={cn('text-3xl font-bold text-white mb-2', titleClassName)}
          >
            {title}
          </h1>
          <p className={cn('text-slate-400 mb-8', subtitleClassName)}>
            {subtitle}
          </p>

          <form onSubmit={handleCodeSubmit} className="w-full">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'w-full bg-slate-800 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500',
                  inputClassName
                )}
              />
            </div>

            {error && (
              <p className={cn('text-red-400 text-sm mt-3', errorClassName)}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className={cn(
                'w-full mt-6 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all duration-200 focus:ring-4 focus:ring-green-500/50 disabled:bg-slate-600',
                buttonClassName
              )}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

