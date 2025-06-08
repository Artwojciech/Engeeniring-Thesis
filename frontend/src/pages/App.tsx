import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

import reactLogo from "../assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
  const carouselRef = useRef<CarouselApi | null>(null)

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollNext()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-4">
      <h1 className="text-4xl font-bold">STRONA FOTOGRAFA</h1>

      <Carousel
        className="w-64"
        opts={{ loop: true }}
        setApi={(api) => (carouselRef.current = api)}
      >
        <CarouselContent>
          <CarouselItem>
            <img src={viteLogo} alt="Vite Logo" className="w-full h-auto" />
          </CarouselItem>
          <CarouselItem>
            <img src={reactLogo} alt="React Logo" className="w-full h-auto" />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <Button
        onClick={() => alert("Kliknięto przycisk!")}
        className="text-lg px-6 py-3"
      >
        Kliknij mnie
      </Button>
    </div>
  )
}

export default App
