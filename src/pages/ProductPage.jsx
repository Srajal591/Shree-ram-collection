"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { HeartIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from "@heroicons/react/24/solid"
import productsData from "../data/products.json"

const ProductPage = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === Number.parseInt(productId))
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors?.[0] || "")
      setSelectedSize(foundProduct.sizes?.[0] || "")

      // Get related products from same category
      const related = productsData
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [productId])

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Added to cart:", {
      product: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
  }

  const handleBuyNow = () => {
    // Buy now logic here
    console.log("Buy now:", {
      product: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/" className="text-cyan-600 hover:text-cyan-700">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const productImages = [
    product.image,
    product.image, // Duplicate for demo
    product.image,
    product.image,
  ]

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      comment: "Excellent quality and perfect fit. Highly recommended!",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 4,
      comment: "Good product, fast delivery. The color is exactly as shown.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 5,
      comment: "Amazing quality for the price. Will definitely buy again.",
      date: "2024-01-08",
      verified: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">
              Home
            </Link>
            <span>/</span>
            <Link
              to={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-gray-700"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md font-medium">
                  -{product.discount}% OFF
                </div>
              )}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-cyan-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.brand}</p>

              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="text-lg text-green-600 font-medium">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? "border-cyan-500" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Size: <span className="font-normal">{selectedSize}</span>
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-sm border rounded-md ${
                        selectedSize === size
                          ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <TruckIcon className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowPathIcon className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {["description", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium capitalize ${
                    activeTab === tab ? "text-cyan-600 border-b-2 border-cyan-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description ||
                    `Experience premium quality with our ${product.name}. Crafted with attention to detail and designed for comfort, this piece combines style and functionality perfectly. Made from high-quality materials that ensure durability and long-lasting wear.`}
                </p>
                <h4 className="font-medium text-gray-900 mt-6 mb-3">Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Premium quality fabric</li>
                  <li>Comfortable fit</li>
                  <li>Easy care instructions</li>
                  <li>Available in multiple sizes and colors</li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                  <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium">Write a Review</button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.name}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Delivery Information</h4>
                  <p className="text-gray-700">
                    Free delivery on orders above ₹999. Standard delivery takes 3-5 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
                  <p className="text-gray-700">
                    Easy 30-day returns. Items must be in original condition with tags attached.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Care Instructions</h4>
                  <p className="text-gray-700">
                    Machine wash cold, tumble dry low, do not bleach, iron on low heat if needed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 hover:text-cyan-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{relatedProduct.brand}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-gray-900">₹{relatedProduct.price}</span>
                      <div className="flex items-center">
                        <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage
