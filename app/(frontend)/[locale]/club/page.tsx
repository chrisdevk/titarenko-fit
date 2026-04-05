import { Suspense } from "react";
import { Duration } from "./_components/duration";
import { ExpiredToast } from "./_components/expired-toast";
import { FinalCta } from "./_components/final-cta";
import { ClubGallery } from "./_components/gallery";
import { ClubHero } from "./_components/hero";
import { ClubIntro } from "./_components/intro";
import { NoThinking } from "./_components/no-thinking";
import { Subscription } from "./_components/subscription";
import { WhySection } from "./_components/why-section";
import { WorkoutVariety } from "./_components/workout-variety";

export const revalidate = 3600;

export default async function ClubPage() {
  return (
    <>
      <Suspense>
        <ExpiredToast />
      </Suspense>
      <ClubHero />

      <div className="bg-cyan-light">
        <ClubIntro />
        <NoThinking />
      </div>

      <WorkoutVariety />

      <ClubGallery />

      <Subscription />

      <WhySection />

      <Duration />

      <FinalCta />
    </>
  );
}
