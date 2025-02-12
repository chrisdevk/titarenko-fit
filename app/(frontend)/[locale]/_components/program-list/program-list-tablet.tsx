import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export const ProgramListTablet = () => {
  const t = useTranslations("HomePage");

  const listItems = t.raw("list-items") as string[];

  return (
    <div className="hidden justify-between md:flex lg:hidden">
      <div className="flex flex-col gap-y-3">
        {listItems.slice(0, 4).map((text, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <Image src="/icons/check.svg" alt="check" width={44} height={44} />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-3">
        {listItems.slice(4, 7).map((text, index) => (
          <div key={index} className="flex max-w-[346px] items-center gap-x-4">
            <Image src="/icons/check.svg" alt="check" width={44} height={44} />
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
