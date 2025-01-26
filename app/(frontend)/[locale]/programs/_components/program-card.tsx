import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface ProgramCardProps {
  title: string;
  imgSrc: string;
  question?: string | null;
  description: string;
  path: string;
}

export const ProgramCard = ({
  title,
  imgSrc,
  question,
  description,
  path,
}: ProgramCardProps) => {
  const t = useTranslations("ProgramPage");

  return (
    <div className="flex flex-col gap-y-4 h-[500px] rounded-3xl shadow-md bg-off-white w-full">
      <div className="relative w-full h-[250px]">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover rounded-3xl"
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-between h-1/2 px-4 pb-4">
        <h3>{title}</h3>
        <div className="space-y-2.5">
          {question && (
            <p className="text-violet-600 font-semibold leading-snug">
              {question}
            </p>
          )}
          <p className="text-grey-custom leading-snug">{description}</p>
        </div>
        <Link
          href={path}
          className={cn("z-10", buttonVariants({ variant: "default" }))}
        >
          {t("button")}
        </Link>
      </div>
    </div>
  );
};
