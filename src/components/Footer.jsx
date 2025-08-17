// import { Link } from "react-router-dom"

// const Footer = () => {
//   return (
//     <footer className="bg-[#1E293B] text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">S</span>
//               </div>
//               <span className="text-xl font-bold">Shree Ram Collection</span>
//             </div>
//             <p className="text-gray-300 mb-4">
//               Your ultimate destination for trendy and affordable fashion. Discover the latest styles and express your
//               unique personality.
//             </p>
//             <div className="flex space-x-4">
//               {/* Social icons same as before */}
//               <a href="#" className="text-gray-300 hover:text-white transition-colors">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
//                 </svg>
//               </a>
//               {/* ... other icons unchanged */}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/" className="text-gray-300 hover:text-white transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/category/men's-clothing" className="text-gray-300 hover:text-white transition-colors">
//                   Men's Clothing
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/category/women's-clothing" className="text-gray-300 hover:text-white transition-colors">
//                   Women's Clothing
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/category/footwear" className="text-gray-300 hover:text-white transition-colors">
//                   Footwear
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/combo" className="text-gray-300 hover:text-white transition-colors">
//                   Combo Builder
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
//               <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
//             <p className="text-gray-300 mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               />
//               <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700 transition-colors">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-300 text-sm">© 2025 Shree Ram Collection. All rights reserved.</p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
//             <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms of Service</a>
//             <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Cookie Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-900 to-amber-900 text-yellow-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center animate-pulse-slow">
                <span className="text-yellow-100 font-extrabold text-2xl">S</span>
              </div>
              <span className="text-2xl font-extrabold">Shree Ram Collection</span>
            </div>
            <p className="text-yellow-300 mb-4">
              Your ultimate destination for trendy and affordable fashion. Discover the latest styles and express your unique personality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-yellow-300 hover:text-yellow-100 transition-colors animate-bounce-slow">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
                </svg>
              </a>
              {/* ... other icons unchanged with same animation */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up delay-200">
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-yellow-300 hover:text-yellow-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/men's-clothing" className="text-yellow-300 hover:text-yellow-100 transition-colors">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/women's-clothing" className="text-yellow-300 hover:text-yellow-100 transition-colors">
                  Women's Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/footwear" className="text-yellow-300 hover:text-yellow-100 transition-colors">
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/combo" className="text-yellow-300 hover:text-yellow-100 transition-colors">
                  Combo Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="animate-fade-in-up delay-400">
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-yellow-300 hover:text-yellow-100 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-yellow-300 hover:text-yellow-100 transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-yellow-300 hover:text-yellow-100 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-yellow-300 hover:text-yellow-100 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-yellow-300 hover:text-yellow-100 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="animate-fade-in-up delay-600">
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">Stay Updated</h3>
            <p className="text-yellow-300 mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-yellow-800 text-yellow-100 border border-yellow-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              />
              <button className="bg-yellow-600 text-yellow-100 px-4 py-2 rounded-r-md hover:bg-yellow-700 transition-all duration-300 animate-pulse-slow">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-yellow-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-yellow-300 text-sm">© 2025 Shree Ram Collection. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-yellow-300 hover:text-yellow-100 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-yellow-300 hover:text-yellow-100 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-yellow-300 hover:text-yellow-100 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
      {/* Decorative Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath fill=%22%23facc15%22 fill-opacity=%220.1%22 d=%22M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,128C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z%22/%3E%3C/svg%3E')] bg-no-repeat animate-wave-slow"></div>
    </footer> 
    
  )
}
<style>
{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes pulseSlow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes bounceSlow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  @keyframes waveSlow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }
  .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
  .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }
  .animate-fade-in-up.delay-600 { animation-delay: 0.6s; }
  .animate-pulse-slow {
    animation: pulseSlow 3s ease-in-out infinite;
  }
  .animate-bounce-slow {
    animation: bounceSlow 3s ease-in-out infinite;
  }
  .animate-wave-slow {
    animation: waveSlow 15s linear infinite;
  }
`}
</style>

export default Footer

