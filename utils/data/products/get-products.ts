"use server";

export const getProducts = async ({ locale }: { locale: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?locale=${locale}&fallback-locale=none`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch programs");
      return null;
    }

    const data = await response.json();

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching programs:", error);
    return null;
  }
};
