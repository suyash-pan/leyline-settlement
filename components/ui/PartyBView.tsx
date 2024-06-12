"use client";

import { useState, useEffect } from 'react';

const PartyBView: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAmount = parseFloat(localStorage.getItem('amount') || '0');
      setAmount(storedAmount);
    }
  }, []);

  const handleResponse = (agreed: boolean) => {
    if (typeof window !== 'undefined') {
      const response = { agreed, amount };
      localStorage.setItem('response', JSON.stringify(response));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        const storedAmount = parseFloat(localStorage.getItem('amount') || '0');
        setAmount(storedAmount);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-2 rounded-lg border">{amount}</div>
      <div className="sm:flex sm:flex-row-reverse flex-col sm:space-x-2 items-center space-y-4 sm:space-y-0">
        <button onClick={() => handleResponse(true)} className="bg-green-500 text-white p-2 rounded-lg sm:w-40 w-full sm:ml-3 flex items-center justify-center ">
          Agree
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current ml-2">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.2l-3.5-3.5-1.4 1.4 5.9 5.9L21 7.6l-1.4-1.4z"/>
          </svg>
        </button>
        <button onClick={() => handleResponse(false)} className="bg-red-400 text-white p-2 rounded-lg w-full sm:w-40 flex items-center justify-center">
          Dispute
          ?
        </button>
      </div>
    </div>
  );
};

export default PartyBView;
