export const login = async (data: { email: string; password: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};
