import { User } from "@/payload-types";

export interface UserResponse {
  user: User | null;
  message?: string;
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch("/api/users/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch current user");
      return null;
    }

    const data: UserResponse = await response.json();

    if (data.user) {
      return data.user;
    }

    console.warn("No user found:", data.message);
    return null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
