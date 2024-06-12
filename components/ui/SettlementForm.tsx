"use client";

import { useState, useEffect, FormEvent } from 'react';

interface SettlementFormProps {
  currentAmount: number;
  onSubmit: (amount: number) => void;
}

const SettlementForm: React.FC<SettlementFormProps> = ({ currentAmount, onSubmit }) => {
  const [amount, setAmount] = useState<number>(currentAmount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(amount);
  };

  useEffect(() => {
    setAmount(currentAmount);
  }, [currentAmount]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="border p-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 sm:w-1/4 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default SettlementForm;
