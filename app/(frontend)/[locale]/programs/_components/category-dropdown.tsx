import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/payload-types";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface CategoryDropdownProps {
  categories: { id: number; title: string | null | undefined; count: number }[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  programs: Product[];
  filteredPrograms: Product[];
}

export const CategoryDropdown = ({
  categories,
  currentCategory,
  setCurrentCategory,
  programs,
  filteredPrograms,
}: CategoryDropdownProps) => {
  const t = useTranslations("ProgramPage");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-3xl bg-purple-custom px-4 py-2 text-start text-lg text-white">
        <div className="flex items-center gap-x-2">
          {currentCategory === "all" ? t("all") : currentCategory}
          <span className="rounded-3xl bg-white px-1.5 text-xs text-purple-custom">
            {currentCategory === "all"
              ? programs.length
              : filteredPrograms.length}
          </span>
        </div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-auto w-screen max-w-[91%] rounded-3xl">
        <DropdownMenuItem onClick={() => setCurrentCategory("all")}>
          <span className="rounded-3xl bg-white px-1.5 text-xs text-purple-custom">
            {programs.length}
          </span>
          {t("all")}
        </DropdownMenuItem>
        {categories.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => setCurrentCategory(category.title!)}
          >
            <span className="rounded-3xl bg-white px-1.5 text-xs text-purple-custom">
              {category.count}
            </span>{" "}
            {category.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
