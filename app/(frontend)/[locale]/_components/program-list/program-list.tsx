import Image from "next/image";
import { ProgramListTablet } from "./program-list-tablet";
import { listItems } from "@/lib/constants";

export const ProgramList = () => {
  return (
    <section className="w-11/12 max-w-[1440px] mx-auto mt-[120px] space-y-2">
      <div className="flex-col lg:flex-wrap lg:flex-row justify-center gap-4 w-full flex md:hidden lg:flex">
        {listItems.map((item, index) => (
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
      <ProgramListTablet />
    </section>
  );
};
