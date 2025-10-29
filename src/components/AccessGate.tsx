'use client';

import React, { useState } from 'react';
import { Lock, KeyRound } from 'lucide-react';


export const AccessGate = () => {
  const [inputCode, setInputCode] = useState('');


  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black p-4 overflow-hidden">
        ?
    </div>
  );
};