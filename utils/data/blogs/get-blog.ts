export const getBlog = async ({
  id,
  locale,
}: {
  id: string;
  locale: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${id}?locale=${locale}&fallback-locale=none`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch blog");
      return null;
    }

    const data = await response.json();

    return data || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};
