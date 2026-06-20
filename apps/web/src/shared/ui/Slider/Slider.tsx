'use client';

import { ReactNode } from 'react';

import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/ui/carousel';

export interface SliderPropsType {
  slot: ReactNode[];
}

const Slider = ({ slot }: SliderPropsType) => {
  return (
    <Carousel className="w-full px-5">
      <CarouselContent>
        {slot.map((content, index) => (
          <CarouselItem key={index}>{content}</CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
