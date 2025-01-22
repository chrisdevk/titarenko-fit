import { Blog } from "@/payload-types";
import { getBlog } from "@/utils/data/blogs/get-blog";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string; locale: string }>;
}) {
  const { blogId, locale } = await params;

  const blog: Blog = await getBlog({ id: blogId, locale: locale });

  if (!blog) {
    return (
      <main className="w-11/12 max-w-3xl mx-auto mt-36">
        <p>Blog not found or not available in the current locale</p>
      </main>
    );
  }

  return (
    <main className="w-11/12 max-w-3xl mx-auto mt-36">
      <RichText data={blog.body} className="space-y-4" />
    </main>
  );
}
