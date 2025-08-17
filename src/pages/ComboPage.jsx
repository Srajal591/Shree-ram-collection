"use client"

import { useState, useEffect } from "react"
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import productsData from "../data/products.json"

const ComboPage = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const [availableProducts, setAvailableProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Men's Clothing", "Women's Clothing", "Footwear", "Accessories"]

  const discountTiers = [
    { minItems: 2, discount: 10, label: "2+ items" },
    { minItems: 3, discount: 15, label: "3+ items" },
    { minItems: 4, discount: 20, label: "4+ items" },
    { minItems: 5, discount: 25, label: "5+ items" },
  ]

  useEffect(() => {
    setAvailableProducts(productsData)
  }, [])

  const filteredProducts = availableProducts.filter(
    (product) => activeCategory === "All" || product.category === activeCategory,
  )

  const addToCombo = (product) => {
    const existingItem = selectedItems.find((item) => item.id === product.id)
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setSelectedItems([...selectedItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCombo = (productId) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, change) => {
    setSelectedItems(
      selectedItems
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = Math.max(1, item.quantity + change)
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const calculateTotal = () => {
    const subtotal = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const currentDiscount = getCurrentDiscount()
    const discountAmount = (subtotal * currentDiscount) / 100
    return {
      subtotal,
      discount: currentDiscount,
      discountAmount,
      total: subtotal - discountAmount,
    }
  }

  const getCurrentDiscount = () => {
    const totalItems = selectedItems.reduce((total, item) => total + item.quantity, 0)
    const applicableTier = discountTiers
      .filter((tier) => totalItems >= tier.minItems)
      .sort((a, b) => b.discount - a.discount)[0]
    return applicableTier ? applicableTier.discount : 0
  }

  const getNextDiscount = () => {
    const totalItems = selectedItems.reduce((total, item) => total + item.quantity, 0)
    const nextTier = discountTiers.find((tier) => totalItems < tier.minItems)
    return nextTier
  }

  const totals = calculateTotal()
  const nextDiscount = getNextDiscount()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your Perfect Combo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mix and match your favorite items and unlock amazing discounts. The more you add, the more you save!
          </p>
        </div>

        {/* Discount Tiers */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Unlock Better Discounts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {discountTiers.map((tier, index) => {
              const totalItems = selectedItems.reduce((total, item) => total + item.quantity, 0)
              const isActive = totalItems >= tier.minItems
              const isCurrent = getCurrentDiscount() === tier.discount && isActive

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 text-center ${
                    isCurrent
                      ? "border-green-500 bg-green-50"
                      : isActive
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isCurrent ? "text-green-600" : isActive ? "text-cyan-600" : "text-gray-400"
                    }`}
                  >
                    {tier.discount}%
                  </div>
                  <div
                    className={`text-sm ${isCurrent ? "text-green-600" : isActive ? "text-cyan-600" : "text-gray-500"}`}
                  >
                    {tier.label}
                  </div>
                  {isCurrent && <div className="text-xs text-green-600 font-medium mt-1">Current</div>}
                </div>
              )
            })}
          </div>
          {nextDiscount && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Add {nextDiscount.minItems - selectedItems.reduce((total, item) => total + item.quantity, 0)} more
                item(s) to unlock {nextDiscount.discount}% discount!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map((product) => {
                const isSelected = selectedItems.some((item) => item.id === product.id)
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all ${
                      isSelected ? "ring-2 ring-cyan-500" : "hover:shadow-md"
                    }`}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCombo(product)}
                        className={`w-full py-2 rounded-md font-medium transition-colors ${
                          isSelected
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-cyan-600 text-white hover:bg-cyan-700"
                        }`}
                      >
                        {isSelected ? "Added to Combo" : "Add to Combo"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Combo Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Combo ({selectedItems.reduce((total, item) => total + item.quantity, 0)} items)
              </h3>

              {selectedItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <PlusIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">Start adding items to your combo</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCombo(item.id)}
                            className="p-1 text-red-400 hover:text-red-600"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₹{totals.subtotal}</span>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({totals.discount}%):</span>
                        <span>-₹{totals.discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>₹{totals.total}</span>
                    </div>
                    {totals.discount > 0 && (
                      <p className="text-sm text-green-600">You saved ₹{totals.discountAmount}!</p>
                    )}
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-cyan-700 hover:to-emerald-700 transition-colors mt-6">
                    Add Combo to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComboPage
