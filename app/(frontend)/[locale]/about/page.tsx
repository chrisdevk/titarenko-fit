import { Achievements } from "./_components/achievements";
import { Career } from "./_components/career";
import { Certificates } from "./_components/certificates";
import { Education } from "./_components/education";
import { Story } from "./_components/story";

export default function AboutPage() {
  return (
    <>
      <Achievements />
      <Education />
      <Career />
      <Certificates />
      <Story />
    </>
  );
}
