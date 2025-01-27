import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export const FaqAccordion = () => {
  const t = useTranslations("SingleProgramPage");

  const faqItems: { question: string; answer: string }[] = t.raw("accordion");

  return (
    <Accordion
      type="single"
      defaultValue="item-1"
      className="w-[780px] rounded-3xl bg-white px-10 py-4"
    >
      {faqItems.map(
        (item: { question: string; answer: string }, index: number) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ),
      )}
    </Accordion>
  );
};
