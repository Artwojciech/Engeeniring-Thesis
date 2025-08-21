import React, { useCallback } from 'react'
import  type {EmblaOptionsType}  from 'embla-carousel'
import type {EmblaCarouselType} from 'embla-carousel'
import { DotButton, useDotButton } from './CarouselDots'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

type Slide = {
  small: string 
  large: string 
}

type PropType = {
  slides: Slide[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  return (
    <section className="embla">
      <div className="embla__viewport relative z-0" ref={emblaRef}>
        <div className="embla__container">
            {slides.map((src, index) => (
            <div
                className="embla__slide flex-[0_0_100%] h-full relative z-0"
                key={index}
            >
                <img
                    src={src.large} 
                    srcSet={`${src.small} 1080w, ${src.large} 1920w`}
                    sizes="(max-width: 768px) 1080px, 1920px"
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                />
            </div>
            ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel