import EmblaCarousel from "@/components/custom/Carousel"
import type { EmblaOptionsType } from "embla-carousel"
import '../components/custom/CarouselStyle.css'

import img1Small from "@/assets/karuzelajedensmall.png"
import img1Large from "@/assets/karuzelajedenlarge.png"
import img2Small from "@/assets/karuzeladwasmall.png"
import img2Large from "@/assets/karuzeladwalarge.png"
import img3Small from "@/assets/karuzelatrzysmall.png"
import img3Large from "@/assets/karuzelatrzylarge.png"
import img4Small from "@/assets/karuzelaczterysmall.png"
import img4Large from "@/assets/karuzelaczterylarge.png"
import img5Small from "@/assets/karuzelapiecsmall.png"
import img5Large from "@/assets/karuzelapieclarge.png"

const images = [
  { small: img1Small, large: img1Large },
  { small: img2Small, large: img2Large },
  { small: img3Small, large: img3Large },
  { small: img4Small, large: img4Large },
  { small: img5Small, large: img5Large },
]

const OPTIONS: EmblaOptionsType = { loop: true }

export default function HomePage() {
  return (
    <div className="w-full h-screen">                               
      <EmblaCarousel slides={images} options={OPTIONS} />          {/* wazne jak bede pisal prace!!!! uzylem generatora embla do stworzenia tej karuzeli, mysle ze to ciekawe i moge napisac cos na ten temat*/}
    </div>                                                                                                     
  )
}