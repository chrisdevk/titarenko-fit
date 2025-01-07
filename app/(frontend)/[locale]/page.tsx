import { Awards } from "./_components/awards";
import { Hero } from "./_components/hero";
import { Reasons } from "./_components/reasons/reasons";

export default function Home() {
  return (
    <main>
      <Hero />
      <Awards />
      <Reasons />
    </main>
  );
}
