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

import underSmall from "@/assets/undercarouselsmall.png"
import underLarge from "@/assets/undercarousellarge.png"

import { ArrowLongRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

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
    <div className="w-full">
      <div className="h-screen">
        <EmblaCarousel slides={images} options={OPTIONS} />                   {/* wazne jak bede pisal prace!!!! uzylem generatora embla do stworzenia tej karuzeli, mysle ze to ciekawe i moge napisac cos na ten temat*/}    
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 w-full border-t-12 border-homeside">
        <div className="w-full h-full">
          <img
            src={underLarge}
            srcSet={`${underSmall} 1080w, ${underLarge} 1920w`}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Pod karuzelą"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center bg-homeside p-10">
              <div className="max-w-md text-left -ml-18">
                <h2 className="text-6xl 2xl:text-7xl font-semibold mb-6 text-footerbg">
                  For me, photography is more than just a job...
                </h2>
                <p className="2xl:text-lg text-footerbg mb-12 font-merri">
                  I firmly believe that services which I provide simply aren't your typical photoshoots.
                  They form a profound bond built upon mutual ideas and distinct personalities.
                </p>
                <div className="flex items-center gap-1 mb-7">
                  <ChevronDoubleRightIcon className="w-10 h-10 2xl:w-12 2xl:h-12 text-footerbg" />
                  <h3 className="text-4xl font-semibold">Services</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <ArrowLongRightIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-footerbg flex-shrink-0" />
                    <span className="text-footerbg text-lg 2xl:text-xl">Stunning fashion shots</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowLongRightIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-footerbg flex-shrink-0" />
                    <span className="text-footerbg text-lg 2xl:text-xl">Complete media bundle during basketball games and other sport events</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowLongRightIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-footerbg flex-shrink-0" />
                    <span className="text-footerbg text-lg 2xl:text-xl">Street and Wildlife photography prints, ideal as an interior decoration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowLongRightIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-footerbg flex-shrink-0" />
                    <span className="text-footerbg text-lg 2xl:text-xl">Atmospheric Concert coverage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowLongRightIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-footerbg flex-shrink-0" />
                    <span className="text-footerbg text-lg 2xl:text-xl">Tailor-made Commercial photoshoots</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowLongRightIcon className="w-6 h-6 2xl:w-7 2xl:h-7 text-footerbg flex-shrink-0" />
                    <span className="text-footerbg text-lg 2xl:text-xl">Personal photo sessions adjusted to the client</span>
                  </li>
                </ul>
              </div>
            </div>
      </section>
    </div>
  )
}