import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}

export const CategoryCard = ({
  imgSrc,
  title,
  description,
  link,
  className,
}: CategoryCardProps) => {
  const t = useTranslations("HomePage.categories");

  return (
    <div
      className={cn(
        "relative z-10 flex h-full w-full flex-col gap-y-5 rounded-3xl bg-white shadow-md",
        className,
      )}
    >
      <div className="relative h-[262px] w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="rounded-t-3xl object-cover"
        />
      </div>
      <div className="flex h-1/2 flex-col justify-between px-4 pb-5">
        <div className="space-y-1">
          <h3 className="uppercase">{title}</h3>
          <p className="leading-6 text-grey-custom">{description}</p>
        </div>
        <Link
          href={link}
          className={cn("w-fit", buttonVariants({ variant: "default" }))}
        >
          <span>{t("button")}</span>
          <MoveUpRight size={24} />
        </Link>
      </div>
    </div>
  );
};
