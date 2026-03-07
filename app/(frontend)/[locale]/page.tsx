import { Awards } from "./_components/awards";
import { Categories } from "./_components/categories/categories";
import { Hero } from "./_components/hero";
import { ProgramList } from "./_components/program-list/program-list";
import { Reasons } from "./_components/reasons/reasons";
import { Testimonials } from "./_components/testimonials/testimonials";
import { TrainingPreview } from "./_components/training-preview/training-preview";
import { TrainingType } from "./_components/training-type/training-type";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "ru" }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Hero />
      <Awards />
      <article className="bg-turquoise-dark">
        <section className="rounded-t-3xl bg-turquoise-light py-16">
          <Reasons />
          <ProgramList />
        </section>
      </article>
      <TrainingPreview />
      <TrainingType locale={locale} />
      <Categories />
      <Testimonials />
    </>
  );
}
