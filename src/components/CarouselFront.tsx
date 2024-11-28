import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "./ui/carouselShad"

import { Card, CardContent } from "./ui/card"

function CarouselFront() {
  return (
    <div className="flex ">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full bg-white pl-10 pt-10"
      >
        <CarouselContent >
          {Array.from({ length: 5 }).map((_, index) => { 
            const colors = ['#3E63DD', '#664282', '#E54666','#664282',  '#3E63DD'];
            const color = colors[index];
            const places = ['Education', 'Training', 'Feedback', 'Entertainement', 'Engagement']

            return (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
              <div className="p-1">
                <Card className="w-100 h-60 " style={{ backgroundColor: color }}>
                    <CardContent className="flex flex-col justify-center items-center select-none cursor-pointer">
                      <span className="text-5xl font-semibold ">{places[index]}</span>
                      <span>Hello world</span>
                    </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )})}
        </CarouselContent>
      </Carousel>
    </div>

  )
}

export default CarouselFront
  