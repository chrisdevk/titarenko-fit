export const getCategories = async ({ locale }: { locale: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?locale=${locale}&fallback-locale=none`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch categories");
      return null;
    }

    const data = await response.json();

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};
