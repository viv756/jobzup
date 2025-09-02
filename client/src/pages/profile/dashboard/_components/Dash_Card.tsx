import { ShieldUser } from "lucide-react";

const DashCard = () => {
  return (
    <div className="w-60 bg-white h-30 rounded-md p-4 pt-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-800 font-dm">POSTED SERVICES</p>
        <div className="bg-green-700 p-1 rounded-md">
          <ShieldUser color="white" />
        </div>
      </div>
      <p className="text-4xl font-semibold font-satoshi">6</p>
    </div>
  );
};

export default DashCard;
