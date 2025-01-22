"use server";

import { User } from "@/payload-types";
import { cookies } from "next/headers";

export interface UserResponse {
  user: User | null;
  message?: string;
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
        credentials: "include",
      }
    );

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
