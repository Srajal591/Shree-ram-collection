"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Eye, Zap } from "lucide-react"

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    // Add to cart logic here
    console.log("Added to cart:", product.name)
  }

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={product.images?.[currentImageIndex] || product.image}
            alt={product.name}
            className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            onMouseEnter={() => product.images?.length > 1 && setCurrentImageIndex(1)}
            onMouseLeave={() => setCurrentImageIndex(0)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">BESTSELLER</span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isWishlisted ? "bg-red-500 text-white" : "bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
            <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-primary-500 hover:text-white transition-all duration-300">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
          </div>

          {/* Image Dots */}
          {product.images?.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Colors */}
          {product.colors && (
            <div className="flex items-center gap-1 mb-3">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 border-gray-200 ${
                    color === "white"
                      ? "bg-white"
                      : color === "black"
                        ? "bg-black"
                        : color === "navy"
                          ? "bg-navy-600"
                          : color === "gray"
                            ? "bg-gray-400"
                            : color === "red"
                              ? "bg-red-500"
                              : color === "blue"
                                ? "bg-blue-500"
                                : color === "green"
                                  ? "bg-green-500"
                                  : `bg-${color}-500`
                  }`}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Sizes */}
          {product.sizes && (
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-gray-600">Sizes:</span>
              {product.sizes.slice(0, 3).map((size, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
