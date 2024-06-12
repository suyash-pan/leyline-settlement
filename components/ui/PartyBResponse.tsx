"use client";

interface PartyBResponseProps {
  response: { agreed: boolean; amount: number } | null;
}

const PartyBResponse: React.FC<PartyBResponseProps> = ({ response }) => {
  if (!response) return null;
  return (
    <div className={`p-4 rounded-b-lg ${response.agreed ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      {response.agreed ? 'Agreed' : 'Disputed'}: {response.amount}
    </div>
  );
};

export default PartyBResponse;
