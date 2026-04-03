'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Slider } from '@/lib/types'
import { getImageUrl } from '@/lib/constants'

export default function HeroSlider({ slides }: { slides: Slider[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!slides.length) return null

  return (
    <div className="slider-container relative w-full overflow-hidden bg-primary-900">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={getImageUrl(slide.image_url)}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-xl">
                <h2 className="text-white font-heading font-extrabold text-2xl md:text-4xl lg:text-5xl mb-3 leading-tight">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="text-white/80 text-sm md:text-lg mb-5 leading-relaxed">
                    {slide.subtitle}
                  </p>
                )}
                <Link
                  href={slide.button_link || '/teklif'}
                  className="inline-block bg-accent-500 hover:bg-accent-600 text-primary-800 font-bold px-6 py-3 rounded-lg text-sm md:text-base transition-all hover:scale-105"
                >
                  {slide.button_text || 'Hemen Teklif Al'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrent((current + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-accent-500 w-8' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
