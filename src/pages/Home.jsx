"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid"
import NewsletterForm from "../components/NewsletterForm"
import productsData from "../data/products.json"
import categoriesData from "../data/categories.json"

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])

  const heroSlides = [
    {
      id: 1,
      title: "New Collection 2025",
      subtitle: "Discover the Latest Fashion Trends",
      description: "Explore our curated collection of premium clothing and accessories",
      image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?cs=srgb&dl=fashion-model-blur-325876.jpg&fm=jpg",
      cta: "Shop Now",
      link: "/category/men's-clothing",
    },
    {
      id: 2,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "Don't miss out on incredible deals on your favorite brands",
      image: "https://wallpaperaccess.com/full/2489629.jpg",
      cta: "Shop Sale",
      link: "/category/women's-clothing",
    },
    {
      id: 3,
      title: "Premium Footwear",
      subtitle: "Step Up Your Style",
      description: "Comfortable and stylish shoes for every occasion",
      image: "https://cdn.shopify.com/s/files/1/0408/9909/articles/Clarks_Wallabee_-_Woven_Indigo_-_Fear_Of_God_101_Backless_-_Latte_-_Visvim_FBT_Shaman-Folk_-_Light_Brown_-_Common_Projects_Original_Achilles_Low_-_Grey_-_Maison_Margiela_Replica_Low_T.jpg?v=1629159320/placeholder.svg?height=600&width=800",
      cta: "Explore",
      link: "/category/footwear",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Amazing quality and fast delivery! The clothes fit perfectly and the style is exactly what I was looking for.",
      image: "https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png",
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment:
        "Great customer service and excellent product quality. I've been shopping here for months and never disappointed.",
      image: "https://icon-library.com/images/admin-icon/admin-icon-12.jpg",
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 4,
      comment: "Love the variety and the prices are very reasonable. The combo builder feature is really innovative!",
      image: "https://tse3.mm.bing.net/th/id/OIP.2AzUrnmkCl9kN9gGCXFaSQAAAA?pid=Api&P=0&h=180",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  useEffect(() => {
    // Get featured products (highest rated)
    const featured = productsData.sort((a, b) => b.rating - a.rating).slice(0, 8)
    setFeaturedProducts(featured)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className="relative h-full bg-gradient-to-r from-cyan-600/20 to-emerald-600/20">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">{slide.title}</h1>
                  <h2 className="text-2xl md:text-3xl font-light mb-6 animate-fade-in-delay">{slide.subtitle}</h2>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-delay-2">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-delay-3"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of fashion categories, from casual wear to formal attire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.slice(0, 6).map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-2">{category.description}</p>
                  <span className="text-sm font-medium text-cyan-300">{category.productCount} products</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handpicked favorites that our customers love most</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-cyan-600 transition-colors mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <button className="w-full mt-3 bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/category/men's-clothing"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Combo Builder CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Create Your Perfect Combo</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Mix and match your favorite items and save more with our innovative combo builder
          </p>
          <Link
            to="/combo"
            className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Start Building Your Combo
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterForm />
    </div>
  )
}

export default Home
