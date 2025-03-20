"use client"
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import bg1 from "@/app/dist/000049190039.jpg";
import bg2 from "@/app/dist/logo.jpg";
import React from "react";

const images = [bg1, bg2];
const BannerSection: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className="w-full max-w-7xl px-6 mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-full">
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center h-[50vh] justify-center bg-center rounded-xl px-0 overflow-hidden">
                  <Image
                    src={src}
                    alt={`Ad ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                    width={1000}
                    height={800}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default BannerSection;
