export const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  if (response.status !== 204) {
    return await response.json();
  }

  return null;
};
