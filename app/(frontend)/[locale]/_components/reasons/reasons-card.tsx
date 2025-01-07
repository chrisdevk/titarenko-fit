import React from "react";

interface ReasonsCardProps {
  icon: React.ReactNode;
  text: string;
}

export const ReasonsCard = ({ icon, text }: ReasonsCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-[168px] bg-white rounded-3xl shadow-md py-6 px-8 before:absolute before:inset-0 before:rounded-3xl before:scale-100 hover:before:scale-105 before:bg-white before:transition-transform before:duration-200 before:shadow-md relative">
      <div className="bg-violet-700 size-11 rounded-lg flex items-center justify-center relative z-10">
        {icon}
      </div>
      <p className="text-base text-grey-custom text-center leading-tight relative z-10">
        {text}
      </p>
    </div>
  );
};
