import React from "react";

interface ReasonsCardProps {
  icon: React.ReactNode;
  text: string;
}

export const ReasonsCard = ({ icon, text }: ReasonsCardProps) => {
  return (
    <div className="relative flex h-[168px] w-full flex-col items-center justify-between rounded-3xl px-8 py-6 before:absolute before:inset-0 before:scale-100 before:rounded-3xl before:bg-white/50 before:shadow-md before:transition-transform before:duration-200 hover:before:scale-105">
      <div className="relative z-10 flex size-11 items-center justify-center rounded-lg bg-violet-700 p-1">
        {icon}
      </div>
      <p className="relative z-10 text-center text-lg leading-tight text-grey-custom">
        {text}
      </p>
    </div>
  );
};
