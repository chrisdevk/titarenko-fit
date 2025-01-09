import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carouselItems } from "@/lib/constants";
import Image from "next/image";

export const TestimonialCarousel = () => {
  return (
    <Carousel className="mt-9 relative">
      <CarouselContent className="flex">
        {carouselItems.map((person) => (
          <CarouselItem
            key={person.name}
            className="bg-[#F6F3FE] rounded-3xl pr-6 py-10 pl-[75px] flex flex-col gap-y-3 relative md:basis-5/12 ml-16"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[29px] h-3/4">
              <Image
                src="/images/icons/card-decoration.svg"
                alt="card decoration"
                fill
              />
            </div>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 size-24">
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
            <h4 className="text-lg font-medium">{person.name}</h4>
            <p className="text-grey-custom">{person.review}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-x-4 justify-center mt-6 lg:mt-0 lg:absolute lg:right-[6.5%] lg:-top-1/3">
        <CarouselPrevious variant="default" />
        <CarouselNext variant="default" />
      </div>
    </Carousel>
  );
};
