import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselItems } from "@/lib/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const TestimonialCarousel = () => {
  const t = useTranslations("HomePage.testimonials.carousel-items");

  return (
    <Carousel className="mt-9 relative">
      <CarouselContent className="max-w-full -ml-2 md:-ml-4 pt-12">
        {carouselItems.map((person, index) => (
          <CarouselItem
            key={person.name}
            className="basis-full md:basis-1/2 lg:basis-1/3 pl-3 md:pl-4"
          >
            <div className="bg-[#F6F3FE] rounded-3xl px-7 md:px-6 pb-5 pt-8 lg:pb-10 lg:pt-20 flex flex-col gap-y-2 lg:gap-y-3 relative h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[202px] h-[29px]">
                <Image
                  src="/images/icons/card-decoration-mobile.svg"
                  alt="card decoration"
                  fill
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -top-12 size-24">
                <Image
                  src={person.avatar}
                  alt={person.name}
                  fill
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="flex justify-between">
                <Image
                  src="/images/icons/stars.svg"
                  alt="5 star rating"
                  width={116}
                  height={20}
                />
                <Image
                  src="/images/icons/quote.svg"
                  alt="quote"
                  width={44}
                  height={36}
                  className="self-end"
                />
              </div>
              <h4 className="text-lg font-medium">{t(`${index}.name`)}</h4>
              <p className="text-grey-custom">{t(`${index}.review`)}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-x-4 justify-center mt-6 lg:mt-0 lg:absolute lg:right-0 lg:-top-[20%]">
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </div>
    </Carousel>
  );
};
