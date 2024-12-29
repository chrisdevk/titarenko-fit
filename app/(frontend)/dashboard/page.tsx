"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";

export default function DashboardPage() {
  const logoutMutation = useMutation({
    mutationFn: logout,
  });

  return (
    <div className="flex justify-center mt-20">
      <Button type="button" onClick={() => logoutMutation.mutate()}>
        Log out
      </Button>
    </div>
  );
}
