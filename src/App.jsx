import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import CategoryPage from "./pages/CategoryPage"
import ProductPage from "./pages/ProductPage"
import ComboPage from "./pages/ComboPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/combo-builder" element={<ComboPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
