"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth-service";
import { getCurrentUser } from "@/services/user-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const currentUser = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  }).data;

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/auth");
    },
  });

  // useEffect(() => {
  //   if (!currentUser || currentUser === null) {
  //     router.push("/auth");
  //   }

  //   console.log(currentUser);
  // }, [currentUser]);

  return (
    <div className="flex justify-center mt-20">
      <h1>{currentUser?.name}</h1>
      <Button type="button" onClick={() => logoutMutation.mutate()}>
        Log out
      </Button>
    </div>
  );
}
