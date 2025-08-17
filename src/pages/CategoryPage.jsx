"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FunnelIcon, Squares2X2Icon, ListBulletIcon, StarIcon, HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import productsData from "../data/products.json"
import categoriesData from "../data/categories.json"

const CategoryPage = () => {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    colors: [],
    sizes: [],
    rating: 0,
    sortBy: "featured",
  })
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState(new Set())

  const category = categoriesData.find((cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categoryName)

  useEffect(() => {
    const categoryProducts = productsData.filter(
      (product) => product.category.toLowerCase() === category?.name.toLowerCase(),
    )
    setProducts(categoryProducts)
    setFilteredProducts(categoryProducts)
  }, [categoryName, category])

  useEffect(() => {
    let filtered = [...products]

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => filters.colors.some((color) => product.colors?.includes(color)))
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => filters.sizes.some((size) => product.sizes?.includes(size)))
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [filters, products])

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "colors" || filterType === "sizes") {
        const currentValues = prev[filterType]
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value]
        return { ...prev, [filterType]: newValues }
      }
      return { ...prev, [filterType]: value }
    })
  }

  const availableColors = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Pink", "Purple"]
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-cyan-600 hover:text-cyan-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <Link to="/" className="hover:text-gray-700">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900">{category.name}</span>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-2">{filteredProducts.length} products found</p>
            </div>
            <div className="hidden md:block">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 5000],
                      colors: [],
                      sizes: [],
                      rating: 0,
                      sortBy: "featured",
                    })
                  }
                  className="text-sm text-cyan-600 hover:text-cyan-700"
                >
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange("priceRange", [0, Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleFilterChange("colors", color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        filters.colors.includes(color) ? "border-cyan-500" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFilterChange("sizes", size)}
                      className={`py-2 px-3 text-sm border rounded-md ${
                        filters.sizes.includes(size)
                          ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange("rating", rating)}
                      className={`flex items-center w-full text-left p-2 rounded-md ${
                        filters.rating === rating ? "bg-cyan-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">& up</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                  >
                    <FunnelIcon className="w-5 h-5" />
                    <span>Filters</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md ${
                        viewMode === "grid" ? "bg-cyan-100 text-cyan-700" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Squares2X2Icon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md ${
                        viewMode === "list" ? "bg-cyan-100 text-cyan-700" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <ListBulletIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={`w-full object-cover ${viewMode === "list" ? "h-48" : "h-64"}`}
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      {wishlist.has(product.id) ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {product.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-medium text-gray-900 hover:text-cyan-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{product.brand}</p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        {viewMode === "list" && (
                          <button className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-colors">
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </Link>

                    {viewMode === "grid" && (
                      <button className="w-full mt-3 bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition-colors">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FunnelIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
