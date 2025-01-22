export const getBlogs = async ({ locale }: { locale: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?locale=${locale}&fallback-locale=none`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch blogs");
      return null;
    }

    const data = await response.json();

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};
