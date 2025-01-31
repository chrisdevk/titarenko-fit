import { BlogCard } from "./_components/blog-card";
import { Blog } from "@/payload-types";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { getBlogs } from "@/utils/data/blogs/get-blogs";
import Image from "next/image";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogsPage" });

  const blogs = await getBlogs({ locale: locale });

  if (!blogs) {
    return (
      <main className="mx-auto mt-36 w-11/12 max-w-[1440px]">
        <h1 className="normal-case">{t("heading")}</h1>
        <p>No blogs found...</p>
      </main>
    );
  } else {
    return (
      <div className="relative w-screen overflow-hidden">
        <article className="relative z-10 mx-auto w-11/12 max-w-[1440px] py-28">
          <h1 className="max-w-[900px] normal-case">{t("heading")}</h1>
          <section
            className={cn(
              "mt-10 flex flex-wrap justify-between gap-y-7",
              blogs.length < 3 && "justify-normal gap-x-7",
            )}
          >
            {blogs.map((blog: Blog) => {
              const imgSrc =
                typeof blog.thumbnail === "object" && blog.thumbnail?.url
                  ? blog.thumbnail.url
                  : null;

              return (
                blog.title !== undefined && (
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    imgSrc={imgSrc!}
                    path={`/${locale}/blogs/${blog.id}`}
                  />
                )
              );
            })}
          </section>
        </article>
        <div className="absolute -right-[8%] top-16 h-[266px] w-[276px] rotate-90 md:-right-[1.5%]">
          <Image src="/images/icons/lines-purple.svg" alt="lines blogs" fill />
        </div>
        <div className="absolute -left-[8%] bottom-0.5 h-[266px] w-[276px] -rotate-90 md:-left-[2%]">
          <Image src="/images/icons/lines-purple.svg" alt="lines blogs" fill />
        </div>
      </div>
    );
  }
}
