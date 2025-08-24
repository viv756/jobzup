import React from "react";

type props = {
  icon: React.ReactNode;
  title: string;
  content: string;
};

const InfoCard = ({ icon, title, content }: props) => {
  return (
    <div className="bg-[#F5F7FF] max-w-[250px] flex flex-col items-center justify-center p-6 gap-3 rounded-2xl ">
      {icon}
      <div className="flex flex-col items-center justify-center">
        <p className="text-gray1 text-lg font-roboto ">{title}</p>
        <p className="text-gray-600 font-semibold text-xl font-roboto">{content}</p>
      </div>
    </div>
  );
};

export default InfoCard;
