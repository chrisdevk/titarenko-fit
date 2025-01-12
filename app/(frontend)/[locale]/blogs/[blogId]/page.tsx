import { Blog } from "@/payload-types";
import { getBlog } from "@/services/blog-service";
import { RichText } from "@payloadcms/richtext-lexical/react";

interface BlogPageProps {
  params: { blogId: string; locale: string };
}

export default async function BlogPage({ params }: BlogPageProps) {
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
