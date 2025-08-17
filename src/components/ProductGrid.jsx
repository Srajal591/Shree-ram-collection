"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react"
import ProductCard from "./ProductCard"
import productsData from "../data/products.json"

const ProductGrid = ({ title = "Featured Products", showFilters = true, limit = null }) => {
  const [products, setProducts] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 5000],
    colors: [],
    sizes: [],
    rating: 0,
  })

  const categories = ["shirts", "t-shirts", "jeans", "hoodies", "polos", "trousers"]
  const colors = ["white", "black", "navy", "gray", "red", "blue", "green"]
  const sizes = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38"]
  const priceRanges = [
    { label: "Under ₹1000", min: 0, max: 1000 },
    { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
    { label: "₹2000 - ₹3000", min: 2000, max: 3000 },
    { label: "Above ₹3000", min: 3000, max: 10000 },
  ]

  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) => filters.category.includes(product.category))
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => product.colors?.some((color) => filters.colors.includes(color)))
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => product.sizes?.some((size) => filters.sizes.includes(size)))
    }

    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Apply sorting
    switch (sortBy) {
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
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    setFilteredProducts(filtered)
  }, [filters, sortBy, products, limit])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (filterType === "priceRange") {
        newFilters.priceRange = value
      } else if (filterType === "rating") {
        newFilters.rating = value
      } else {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter((item) => item !== value)
        } else {
          newFilters[filterType] = [...newFilters[filterType], value]
        }
      }

      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 5000],
      colors: [],
      sizes: [],
      rating: 0,
    })
  }

  const activeFiltersCount =
    filters.category.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-primary-100 text-primary-600" : "text-gray-600"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-primary-100 text-primary-600" : "text-gray-600"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            {showFilters && (
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors relative"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">
                        Clear All
                      </button>
                    )}
                    <button onClick={() => setIsFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={() => handleFilterChange("category", category)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                          onChange={() => handleFilterChange("priceRange", [range.min, range.max])}
                          className="border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleFilterChange("colors", color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          filters.colors.includes(color)
                            ? "border-primary-600 ring-2 ring-primary-200"
                            : "border-gray-300"
                        } ${color === "white" ? "bg-white" : color === "black" ? "bg-black" : `bg-${color}-500`}`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange("sizes", size)}
                        className={`px-3 py-1 text-sm border rounded-lg transition-colors ${
                          filters.sizes.includes(size)
                            ? "border-primary-600 bg-primary-50 text-primary-600"
                            : "border-gray-300 text-gray-700 hover:border-primary-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => handleFilterChange("rating", rating)}
                          className="border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <SlidersHorizontal className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
