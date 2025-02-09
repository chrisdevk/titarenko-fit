import { Achievements } from "./_components/achievements";
import { Career } from "./_components/career";
import { Certificates } from "./_components/certificates";
import { Education } from "./_components/education";
import { Story } from "./_components/story";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Achievements />
      <Education />
      <Career />
      <Certificates />
      <Story locale={locale} />
    </>
  );
}
