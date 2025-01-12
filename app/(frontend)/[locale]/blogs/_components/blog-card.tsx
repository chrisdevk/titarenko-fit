import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  imgSrc: string;
  path: string;
}

export const BlogCard = ({ title, imgSrc, path }: BlogCardProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-y-4 rounded-3xl shadow-md bg-white w-[31%]">
      <div className="relative w-full h-[295px]">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="px-4 pb-4 space-y-5">
        <h3>{title}</h3>
        <Link
          href={path}
          className={cn("z-10", buttonVariants({ variant: "secondary" }))}
        >
          {t("BlogsPage.button")}
        </Link>
      </div>
    </div>
  );
};
