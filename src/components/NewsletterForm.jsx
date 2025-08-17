"use client"

import { useState } from "react"

const NewsletterForm = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
      setEmail("")
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Family! 🎉</h3>
            <p className="text-gray-600 mb-6">
              Thank you for subscribing! You'll receive exclusive offers and style updates straight to your inbox.
            </p>
            <button onClick={() => setIsSubscribed(false)} className="text-cyan-600 hover:text-cyan-700 font-medium">
              Subscribe another email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay in Style 💌</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our fashion community and be the first to know about new arrivals, exclusive sales, and style tips from
            our fashion experts.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              No spam, ever
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Unsubscribe anytime
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Exclusive offers
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsletterForm
