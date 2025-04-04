import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  title: string;
  path: string;
  imgSrc: string;
  course_btn_text: string;
}

export const CourseCard = ({
  title,
  path,
  imgSrc,
  course_btn_text,
}: CourseCardProps) => {
  return (
    <div className="col-span-6 flex h-[275px] flex-col items-center justify-between rounded-3xl bg-off-white p-2 md:col-span-3">
      <div className="relative h-[166px] w-full">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="rounded-3xl object-cover"
        />
      </div>
      <h4 className="text-center text-xl font-semibold">{title}</h4>
      <Link href={path} className={cn("z-10 w-full", buttonVariants())}>
        {course_btn_text}
      </Link>
    </div>
  );
};
