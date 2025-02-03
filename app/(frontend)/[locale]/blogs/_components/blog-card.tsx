import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveUpRight } from "lucide-react";
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
    <div className="flex w-full flex-col gap-y-4 rounded-3xl bg-white shadow-md md:w-[49%] lg:w-[31%]">
      <div className="relative h-[295px] w-full">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="rounded-3xl object-cover"
        />
      </div>
      <div className="space-y-5 px-4 pb-4">
        <h3>{title}</h3>
        <Link href={path} className={cn("z-10 w-full", buttonVariants())}>
          {t("BlogsPage.button")}
          <MoveUpRight />
        </Link>
      </div>
    </div>
  );
};
