"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe } from "lucide-react";
import { Button } from "../ui/button";

export const LanguagePopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-x-1">
        <Globe /> <span>EN</span>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Button variant="ghost">English</Button>
        <Button variant="ghost">Русский</Button>
      </PopoverContent>
    </Popover>
  );
};
