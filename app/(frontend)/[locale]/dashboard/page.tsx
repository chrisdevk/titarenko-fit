"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/utils/actions/auth/logout";
import { getCurrentUser } from "@/utils/data/get-current-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
      router.push("/en/auth");
    },
  });

  return (
    <div className="flex justify-center mt-20">
      <h1>{currentUser?.name}</h1>
      <Button type="button" onClick={() => logoutMutation.mutate()}>
        Log out
      </Button>
    </div>
  );
}
