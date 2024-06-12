"use client";

import { useState, useEffect } from 'react';
import SettlementForm from './SettlementForm';
import PartyBResponse from './PartyBResponse';

interface PartyAViewProps {
  onSettlementAgreed: (amount: number) => void;
}

const PartyAView: React.FC<PartyAViewProps> = ({ onSettlementAgreed }) => {
  const [amount, setAmount] = useState<number>(0);
  const [response, setResponse] = useState<{ agreed: boolean; amount: number } | null>(null);
  const [lastAgreedAmount, setLastAgreedAmount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAmount = parseFloat(localStorage.getItem('amount') || '0');
      setAmount(storedAmount);

      const storedResponse = JSON.parse(localStorage.getItem('response') || 'null');
      setResponse(storedResponse);
    }
  }, []);

  const handleSubmit = (newAmount: number) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('amount', newAmount.toString());
      localStorage.removeItem('response');
      setAmount(newAmount);
      setResponse(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        const storedResponse = JSON.parse(localStorage.getItem('response') || 'null');
        setResponse(storedResponse);
        if (storedResponse && storedResponse.agreed && storedResponse.amount !== lastAgreedAmount) {
          onSettlementAgreed(storedResponse.amount);
          setLastAgreedAmount(storedResponse.amount);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [lastAgreedAmount, onSettlementAgreed]);

  return (
    <div className="space-y-4">
      <SettlementForm currentAmount={amount} onSubmit={handleSubmit} />
      <PartyBResponse response={response} />
    </div>
  );
};

export default PartyAView;
