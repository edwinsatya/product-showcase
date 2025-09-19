"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Carousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative w-full h-[400px] flex-shrink-0">
            <Image
              src={img}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
                  <rect width="400" height="200" fill="#f3f3f3" />
                  <rect id="r" width="400" height="200" fill="#ecebeb">
                  <animate attributeName="x" from="-400" to="400" dur="1.2s" repeatCount="indefinite" />
                  </rect>
                </svg>
              `)}`}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                current === i ? "bg-blue-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}