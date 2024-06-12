"use client";

import { useState } from 'react';
import PartyAView from '../components/ui/PartyAView';
import PartyBView from '../components/ui/PartyBView';

const Home: React.FC = () => {
  const [settledAmounts, setSettledAmounts] = useState<number[]>([]);

  const handleSettlementAgreed = (amount: number) => {
    setSettledAmounts((prev) => [...prev, amount]);
  };

  return (
    <div>

      <div className="container mx-auto p-4 flex space-x-4 h-72">
        <div className="w-1/2 p-2 border-r">
          <h2 className="text-2xl mb-4">Party A</h2>
          <PartyAView onSettlementAgreed={handleSettlementAgreed} />
        </div>
        <div className="w-1/2 p-2">
          <h2 className="text-2xl mb-4">Party B</h2>
          <PartyBView />
        </div>
      </div>
      <div className=" mt-4 container mx-auto p-4 sm:w-1/2  bg-green-300 rounded-xl">
          <h2 className="text-2xl mb-4 ">Settled Amounts</h2>
          <div className='p-4 bg-white text-black rounded-b-lg'>
            <ul className="list-decimal pl-5">
              {settledAmounts.map((amount, index) => (
                <li key={index}>{amount}</li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Home;
