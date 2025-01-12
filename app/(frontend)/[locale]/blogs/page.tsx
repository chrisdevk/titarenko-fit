import { getBlogs } from "@/services/blog-service";
import { BlogCard } from "./_components/blog-card";
import { Blog } from "@/payload-types";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

export default async function BlogsPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogsPage" });

  const blogs = await getBlogs({ locale: locale });

  if (!blogs) {
    return (
      <main className="w-11/12 max-w-[1440px] mx-auto mt-36">
        <h1 className="normal-case">{t("heading")}</h1>
        <p>No blogs found...</p>
      </main>
    );
  } else {
    return (
      <main className="w-11/12 max-w-[1440px] mx-auto mt-36">
        <h1 className="normal-case max-w-[900px]">{t("heading")}</h1>
        <article
          className={cn(
            "flex flex-wrap justify-between gap-y-7 mt-10",
            blogs.length < 3 && "gap-x-7 justify-normal"
          )}
        >
          {blogs.map((blog: Blog) => {
            const imgSrc =
              typeof blog.thumbnail === "object" && blog.thumbnail?.url
                ? blog.thumbnail.url
                : null;

            return (
              <BlogCard
                key={blog.id}
                title={blog.title}
                imgSrc={imgSrc || "/default-thumbnail.jpg"}
                path={`/${locale}/blogs/${blog.id}`}
              />
            );
          })}
        </article>
      </main>
    );
  }
}
