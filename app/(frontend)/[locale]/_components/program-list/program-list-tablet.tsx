import { listItems } from "@/utils/constants";
import Image from "next/image";
import React from "react";

export const ProgramListTablet = () => {
  return (
    <div className="md:flex justify-between hidden lg:hidden">
      <div className="flex flex-col gap-y-3">
        {listItems.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <Image
              src="/images/icons/check.svg"
              alt="check"
              width={44}
              height={44}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-3">
        {listItems.slice(4, 7).map((item, index) => (
          <div key={index} className="flex items-center gap-x-4 max-w-[346px]">
            <Image
              src="/images/icons/check.svg"
              alt="check"
              width={44}
              height={44}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
