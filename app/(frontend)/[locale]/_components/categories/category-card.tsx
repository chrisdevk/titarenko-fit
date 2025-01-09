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
        "flex flex-col gap-y-5 rounded-3xl shadow-md w-full h-full",
        className
      )}
    >
      <div className="relative w-full h-[262px]">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="flex flex-col justify-between h-1/2 px-4 pb-5">
        <div className="space-y-1">
          <h3 className="uppercase">{title}</h3>
          <p className="text-grey-custom">{description}</p>
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
