"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from "lucide-react"
import testimonialsData from "../data/testimonials.json"

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Award, value: "4.8/5", label: "Average Rating" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            Customer Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied customers
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative">
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Customer Image */}
              <div className="relative">
                <img
                  src={testimonialsData[currentTestimonial].image || "/placeholder.svg?height=120&width=120"}
                  alt={testimonialsData[currentTestimonial].name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-primary-600 text-white rounded-full p-2">
                  <Quote className="w-4 h-4" />
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonialsData[currentTestimonial].rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <blockquote className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonialsData[currentTestimonial].comment}"
                </blockquote>

                {/* Customer Info */}
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{testimonialsData[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonialsData[currentTestimonial].location}</div>
                  <div className="text-sm text-primary-600 font-medium mt-1">
                    Purchased: {testimonialsData[currentTestimonial].product}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-primary-600 w-8" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* All Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                index === currentTestimonial ? "ring-2 ring-primary-500" : ""
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image || "/placeholder.svg?height=40&width=40"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">{testimonial.comment}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
