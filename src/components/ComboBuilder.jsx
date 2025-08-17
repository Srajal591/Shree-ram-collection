"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, X, ShoppingBag, Sparkles, Gift, Calculator, Check } from "lucide-react"
import productsData from "../data/products.json"

const ComboBuilder = () => {
  const [selectedProducts, setSelectedProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState("shirts")
  const [comboName, setComboName] = useState("")
  const [showSummary, setShowSummary] = useState(false)

  const categories = [
    { id: "shirts", name: "Shirts", icon: "👔" },
    { id: "t-shirts", name: "T-Shirts", icon: "👕" },
    { id: "jeans", name: "Jeans", icon: "👖" },
    { id: "hoodies", name: "Hoodies", icon: "🧥" },
    { id: "polos", name: "Polos", icon: "👔" },
  ]

  const comboOffers = [
    { min: 2, discount: 10, label: "Buy 2 Get 10% OFF" },
    { min: 3, discount: 20, label: "Buy 3 Get 20% OFF" },
    { min: 4, discount: 30, label: "Buy 4 Get 30% OFF" },
    { min: 5, discount: 40, label: "Buy 5+ Get 40% OFF" },
  ]

  const getProductsByCategory = (category) => {
    return productsData.filter((product) => product.category === category)
  }

  const addToCombo = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id)
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)))
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    }
  }

  const removeFromCombo = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCombo(productId)
    } else {
      setSelectedProducts(selectedProducts.map((p) => (p.id === productId ? { ...p, quantity: newQuantity } : p)))
    }
  }

  const calculateTotals = () => {
    const totalItems = selectedProducts.reduce((sum, product) => sum + product.quantity, 0)
    const subtotal = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)

    let discount = 0
    const applicableOffer = comboOffers
      .filter((offer) => totalItems >= offer.min)
      .sort((a, b) => b.discount - a.discount)[0]

    if (applicableOffer) {
      discount = (subtotal * applicableOffer.discount) / 100
    }

    const total = subtotal - discount
    const savings = selectedProducts.reduce(
      (sum, product) => sum + (product.originalPrice - product.price) * product.quantity,
      0,
    )

    return {
      totalItems,
      subtotal,
      discount,
      total,
      savings: savings + discount,
      applicableOffer,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Combo Builder
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Make Your Own <span className="gradient-text">Combo</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mix and match your favorite items to create the perfect combo and save more!
          </p>
        </motion.div>

        {/* Combo Offers Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {comboOffers.map((offer, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  totals.totalItems >= offer.min ? "bg-white/20 ring-2 ring-white/50" : "bg-white/10"
                }`}
              >
                {totals.totalItems >= offer.min && <Check className="w-4 h-4" />}
                <span className="font-medium">{offer.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-3">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getProductsByCategory(activeCategory).map((product) => {
                const isSelected = selectedProducts.find((p) => p.id === product.id)
                const selectedQuantity = isSelected ? isSelected.quantity : 0

                return (
                  <motion.div
                    key={product.id}
                    layout
                    className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
                      isSelected ? "ring-2 ring-primary-500" : ""
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {selectedQuantity}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <div className="flex items-center gap-2 w-full">
                            <button
                              onClick={() => updateQuantity(product.id, selectedQuantity - 1)}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="flex-1 text-center font-medium">{selectedQuantity}</span>
                            <button
                              onClick={() => updateQuantity(product.id, selectedQuantity + 1)}
                              className="p-2 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCombo(product)}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add to Combo
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Combo Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Your Combo</h3>
                </div>

                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">
                      <ShoppingBag className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-600">Start building your combo by selecting products</p>
                  </div>
                ) : (
                  <>
                    {/* Selected Products */}
                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                      <AnimatePresence>
                        {selectedProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                              <p className="text-sm text-gray-600">
                                ₹{product.price} × {product.quantity}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCombo(product.id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Combo Name Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Combo Name (Optional)</label>
                      <input
                        type="text"
                        value={comboName}
                        onChange={(e) => setComboName(e.target.value)}
                        placeholder="My Awesome Combo"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({totals.totalItems} items)</span>
                        <span>₹{totals.subtotal}</span>
                      </div>
                      {totals.savings > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>You Save</span>
                          <span>-₹{totals.savings}</span>
                        </div>
                      )}
                      {totals.applicableOffer && (
                        <div className="flex justify-between text-sm text-primary-600 font-medium">
                          <span>Combo Discount ({totals.applicableOffer.discount}%)</span>
                          <span>-₹{totals.discount}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary-600">₹{totals.total}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        Add Combo to Cart
                      </button>
                      <button
                        onClick={() => setShowSummary(true)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <Calculator className="w-4 h-4" />
                        View Summary
                      </button>
                    </div>

                    {/* Next Discount Hint */}
                    {totals.totalItems < 5 && (
                      <div className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
                        <p className="text-sm text-accent-700">
                          Add{" "}
                          {Math.max(
                            0,
                            comboOffers.find((o) => o.min > totals.totalItems)?.min - totals.totalItems || 0,
                          )}{" "}
                          more item(s) to get {comboOffers.find((o) => o.min > totals.totalItems)?.discount}% OFF!
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Modal */}
        <AnimatePresence>
          {showSummary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowSummary(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Combo Summary</h3>
                  <button
                    onClick={() => setShowSummary(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                        <p className="text-sm font-medium text-primary-600">₹{product.price * product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totals.subtotal}</span>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Combo Discount</span>
                        <span>-₹{totals.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span className="text-primary-600">₹{totals.total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowSummary(false)}
                  className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ComboBuilder
