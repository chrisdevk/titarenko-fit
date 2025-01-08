import { Awards } from "./_components/awards";
import { Categories } from "./_components/categories/categories";
import { Hero } from "./_components/hero";
import { ProgramList } from "./_components/program-list/program-list";
import { Reasons } from "./_components/reasons/reasons";

export default function Home() {
  return (
    <main>
      <Hero />
      <Awards />
      <Reasons />
      <ProgramList />
      <Categories />
    </main>
  );
}
