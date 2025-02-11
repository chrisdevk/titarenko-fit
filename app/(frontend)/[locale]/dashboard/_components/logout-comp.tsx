"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/utils/actions/auth/logout";
import { useRouter } from "next/navigation";

interface LogoutCompProps {
  user_name: string;
  button_text: string;
}

export const LogoutComp = ({ user_name, button_text }: LogoutCompProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between rounded-3xl bg-purple-custom px-4 py-6">
      <h3 className="uppercase text-white">{user_name}</h3>
      <Button
        variant="secondary"
        className="relative z-10"
        onClick={handleLogout}
      >
        {button_text}
      </Button>
    </div>
  );
};
