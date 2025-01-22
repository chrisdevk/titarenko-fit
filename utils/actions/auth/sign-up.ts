export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
};
