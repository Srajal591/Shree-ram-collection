"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2025",
      subtitle: "Discover the Latest Trends",
      description:
        "Elevate your style with our premium summer collection featuring breathable fabrics and contemporary designs.",
      image: "../src/assets/hero/summer-collection.jpg",
      buttonText: "Shop Now",
      offer: "Up to 50% OFF",
      bgGradient: "from-cyan-50 to-blue-50",
    },
    {
      id: 2,
      title: "Premium Casual Wear",
      subtitle: "Comfort Meets Style",
      description: "Experience unmatched comfort with our premium casual collection designed for the modern lifestyle.",
      image: "/placeholder.svg?height=600&width=800",
      buttonText: "Explore Collection",
      offer: "New Arrivals",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      id: 3,
      title: "Exclusive Designer Line",
      subtitle: "Limited Edition",
      description:
        "Own exclusive pieces from our designer collaboration featuring unique patterns and premium materials.",
      image: "/placeholder.svg?height=600&width=800",
      buttonText: "Shop Exclusive",
      offer: "Limited Stock",
      bgGradient: "from-rose-50 to-pink-50",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Main Hero Carousel */}
      <div className="relative h-[70vh] md:h-[80vh] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.bgGradient}`}>
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                  {/* Content */}
                  <div className="space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-cyan-700 border border-cyan-200">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      {slide.offer}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">{slide.title}</h1>

                    <h2 className="text-xl md:text-2xl font-semibold text-gray-700">{slide.subtitle}</h2>

                    <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">{slide.description}</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        {slide.buttonText}
                      </button>

                      <button className="border-2 border-gray-300 hover:border-cyan-600 text-gray-700 hover:text-cyan-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white/50">
                        View Lookbook
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-[400px] md:h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">50%</div>
                        <div className="text-xs text-gray-600">OFF</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-cyan-600 w-8" : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-600">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-rose-600">50+</div>
              <div className="text-gray-600">Brands</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-amber-600">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
