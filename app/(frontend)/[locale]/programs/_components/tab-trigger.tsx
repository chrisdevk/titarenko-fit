import { TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

interface TabTriggerProps {
  value: string;
  onClick: () => void;
  isActive: boolean;
  count: number;
}

export const TabTrigger = ({
  value,
  onClick,
  isActive,
  count,
}: TabTriggerProps) => {
  const t = useTranslations("ProgramPage");

  return (
    <TabsTrigger
      value={value}
      onClick={onClick}
      className="relative flex items-center gap-x-2 rounded-none bg-transparent"
    >
      {value === "all" ? t("all") : value}{" "}
      <span className="rounded-3xl bg-purple-custom px-1.5 text-xs text-white">
        {count}
      </span>
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute -bottom-1 left-0 h-0.5 w-full rounded-3xl bg-purple-custom"
        />
      )}
    </TabsTrigger>
  );
};
