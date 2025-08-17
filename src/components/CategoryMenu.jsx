"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, Zap } from "lucide-react"
import categoriesData from "../data/categories.json"

const CategoryMenu = () => {
  const featuredCategories = categoriesData.slice(0, 6)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
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
            <TrendingUp className="w-4 h-4" />
            Most Wanted Categories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed for every style and occasion
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredCategories.map((category, index) => (
            <motion.div key={category.id} variants={itemVariants} className="group">
              <Link
                to={`/category/${category.slug}`}
                className="block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                {/* Category Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg?height=320&width=300&query=fashion category"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Hot Badge for Popular Categories */}
                  {index < 2 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      HOT
                    </div>
                  )}

                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {category.productCount}+ items
                  </div>
                </div>

                {/* Category Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-primary-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-200 mb-4 text-sm">{category.description}</p>

                  {/* CTA Button */}
                  <div className="flex items-center gap-2 text-primary-300 font-medium group-hover:text-white transition-colors">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Categories
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryMenu
