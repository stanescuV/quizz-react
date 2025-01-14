import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "./ui/carouselShad"

  // UN COMMIT 

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
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 ">
              <div className="p-1">
                <Card className="w-100 h-60 " style={{ backgroundColor: color }}>
                    <CardContent className="flex flex-col select-none cursor-pointer">
                      <span className="text-5xl font-semibold text-white font-pops">{places[index]}</span>
                      <span className="mt-7 text-white font-pops">Engaging group and distance learning for teachers and students.</span>
                      <span className="mt-7 hover:text-blue-500 pd-0 text-white font-pops">Discover ➡</span>
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
  