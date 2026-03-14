import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  content: SerializedEditorState;
}

export const InfoCard = ({ title, content }: InfoCardProps) => {
  return (
    <div>
      {/* Header */}
      <div className="flex h-[60px] items-center gap-[25px] rounded-t-[14px] bg-[#c1eaf1] px-[22px] py-[9px]">
        <div className="flex size-[33px] items-center justify-center rounded-[5px] bg-off-white">
          <Image
            src="/icons/info-icon.svg"
            alt=""
            width={23}
            height={23}
            className="opacity-60"
          />
        </div>
        <h3 className="text-[22px] font-medium text-off-black">{title}</h3>
      </div>

      {/* Body */}
      <div className="rounded-b-[14px] bg-off-white p-10 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="prose prose-base max-w-none text-base text-off-black [&_li]:marker:text-off-black [&_ul]:list-disc [&_ul]:ps-6">
          <RichText data={content} />
        </div>
      </div>
    </div>
  );
};
