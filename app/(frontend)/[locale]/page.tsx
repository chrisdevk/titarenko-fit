import { Awards } from "./_components/awards";
import { Categories } from "./_components/categories/categories";
import { Hero } from "./_components/hero";
import { ProgramList } from "./_components/program-list/program-list";
import { Reasons } from "./_components/reasons/reasons";
import { Testimonials } from "./_components/testimonials/testimonials";
import { TrainingPreview } from "./_components/training-preview/training-preview";

export default function Home() {
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
      <Categories />
      <Testimonials />
    </>
  );
}
