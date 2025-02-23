import { Blog } from "@/payload-types";
import { getBlog } from "@/utils/data/blogs/get-blog";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Metadata } from "next";

type Props = {
  params: Promise<{ blogId: string; locale: "en" | "ru" }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId, locale } = await params;

  const blog = await getBlog({ id: blogId, locale });

  return {
    title: blog?.metadata_title,
    description: blog?.metadata_description,
    keywords: blog?.metadata_keywords
  }
}

export default async function BlogPage({ params }: Props) {
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
