import { Blog } from "@/payload-types";
import { getBlog } from "@/utils/data/blogs/get-blog";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string; locale: "en" | "ru" }>;
}) {
  const { blogId, locale } = await params;

  const blog: Blog | null = await getBlog({ id: blogId, locale: locale });

  if (!blog) {
    return (
      <div className="mx-auto mt-36 w-11/12 max-w-3xl">
        <p>Blog not found or not available in the current locale</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-36 w-11/12 max-w-3xl">
      <RichText data={blog.body} className="space-y-4" />
    </div>
  );
}
