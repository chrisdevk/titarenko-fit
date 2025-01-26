import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselItems } from "@/utils/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const TestimonialCarousel = () => {
  const t = useTranslations("HomePage.testimonials.carousel-items");

  return (
    <Carousel className="relative mt-9">
      <CarouselContent className="-ml-2 max-w-full pt-12 md:-ml-4">
        {carouselItems.map((person, index) => (
          <CarouselItem
            key={person.name}
            className="basis-full pl-3 md:basis-1/2 md:pl-4 lg:basis-1/3"
          >
            <div className="relative flex h-full flex-col gap-y-2 rounded-3xl bg-white px-7 pb-5 pt-8 md:px-6 lg:gap-y-3 lg:pb-10 lg:pt-20">
              <div className="absolute left-1/2 top-0 h-[29px] w-[194px] -translate-x-1/2">
                <Image
                  src="/images/icons/card-decoration.svg"
                  alt="card decoration"
                  fill
                />
              </div>
              <div className="absolute -top-12 left-1/2 size-24 -translate-x-1/2">
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
      <div className="mt-6 flex justify-center gap-x-4 lg:absolute lg:-top-[20%] lg:right-0 lg:mt-0">
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </div>
    </Carousel>
  );
};
