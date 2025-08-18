// "use client"

// import { useState, Fragment } from "react"
// import { Link } from "react-router-dom"
// import {
//   Bars3Icon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
//   ShoppingBagIcon,
//   UserIcon,
//   HeartIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline"
// import { Transition } from "@headlessui/react" // A great library for transitions

// import logo from "../assets/logo.png";
// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false)

//   const categories = [
//     { name: "Men's Clothing", path: "/category/men's-clothing" },
//     { name: "Women's Clothing", path: "/category/women's-clothing" },
//     { name: "Footwear", path: "/category/footwear" },
//     { name: "Accessories", path: "/category/accessories" },
//     { name: "Kids Wear", path: "/category/kids-wear" },
//     { name: "Sports & Active", path: "/category/sports-&-active" },
//   ]

//   // A helper component for the action icons to avoid repetition
//   const ActionIcon = ({ icon: Icon, count, tooltip }) => (
//     <div className="relative group">
//       <button className="p-2 text-gray-600 hover:text-cyan-600 transition-colors">
//         <Icon className="h-6 w-6" />
//         {count > 0 && (
//           <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
//             {count}
//           </span>
//         )}
//       </button>
//       <div className="absolute top-full right-1/2 translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
//         {tooltip}
//       </div>
//     </div>
//   )

//   return (
//     <>
//       {/* Top Banner */}
//       <div className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white text-center py-2.5 text-sm font-medium tracking-wider">
//         🎉 Free Shipping on Orders Above ₹999 | Use Code: <span className="font-extrabold">FREESHIP</span>
//       </div>

//       {/* Main Navbar */}
//       <nav className="backdrop-blur-xl bg-white/80 shadow-sm sticky top-0 z-50 transition-all">
//         <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-2 group">
//               <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30">
//                 <span className="text-white font-black text-2xl italic -rotate-12">F</span>
//               </div>
//               <span className="text-3xl font-bold text-gray-800 group-hover:text-cyan-600 transition-colors">
//                 FashionHub
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-8">
//               <Link to="/" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Home</Link>

//               {/* Categories Dropdown */}
//               <div
//                 className="relative"
//                 onMouseEnter={() => setIsCategoryOpen(true)}
//                 onMouseLeave={() => setIsCategoryOpen(false)}
//               >
//                 <button className="flex items-center gap-1 text-gray-700 hover:text-cyan-600 font-medium transition-colors">
//                   Shop <ChevronDownIcon className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
//                 </button>
//                 <Transition
//                   show={isCategoryOpen}
//                   as={Fragment}
//                   enter="transition ease-out duration-200"
//                   enterFrom="opacity-0 translate-y-1"
//                   enterTo="opacity-100 translate-y-0"
//                   leave="transition ease-in duration-150"
//                   leaveFrom="opacity-100 translate-y-0"
//                   leaveTo="opacity-0 translate-y-1"
//                 >
//                   <div className="absolute -left-8 top-full mt-3 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1">
//                     {categories.map((category) => (
//                       <Link
//                         key={category.name}
//                         to={category.path}
//                         className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-cyan-50 hover:text-cyan-600"
//                       >
//                         {category.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </Transition>
//               </div>
//               <Link to="/combo" className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">Combo Builder</Link>
//               <Link to="/sale" className="text-red-500 hover:text-red-700 font-bold transition-colors">SALE</Link>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setIsSearchOpen(true)}
//                 className="p-2 text-gray-600 hover:text-cyan-600 transition-colors md:block hidden"
//               >
//                 <MagnifyingGlassIcon className="h-6 w-6" />
//               </button>
//                <button
//                 onClick={() => setIsSearchOpen(true)}
//                 className="p-2 text-gray-600 hover:text-cyan-600 transition-colors lg:hidden" // Search for mobile/tablet
//               >
//                 <MagnifyingGlassIcon className="h-6 w-6" />
//               </button>

//               <div className="hidden sm:flex items-center">
//                 <ActionIcon icon={HeartIcon} count={2} tooltip="Wishlist" />
//                 <ActionIcon icon={ShoppingBagIcon} count={3} tooltip="Cart" />
//                 <ActionIcon icon={UserIcon} count={0} tooltip="Account" />
//               </div>

//               {/* Mobile Menu Toggle */}
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="lg:hidden p-2 text-gray-600 hover:text-cyan-600"
//               >
//                 <span className="sr-only">Open menu</span>
//                 {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Search Overlay */}
//       <Transition
//         show={isSearchOpen}
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0"
//         enterTo="opacity-100"
//         leave="ease-in duration-200"
//         leaveFrom="opacity-100"
//         leaveTo="opacity-0"
//       >
//         <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
//            <div className="fixed top-0 left-0 right-0 p-4" onClick={(e) => e.stopPropagation()}>
//              <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//              >
//                 <div className="relative bg-white rounded-xl shadow-2xl max-w-xl mx-auto mt-[10vh]">
//                     <input
//                       type="text"
//                       placeholder="Search for products, brands and more..."
//                       className="w-full pl-12 pr-6 py-4 border-none rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     />
//                     <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
//                     <button onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
//                       <XMarkIcon className="h-6 w-6"/>
//                     </button>
//                 </div>
//               </Transition.Child>
//            </div>
//         </div>
//       </Transition>

//       {/* Mobile Menu */}
//        <Transition show={isMenuOpen}>
//         {/* Overlay */}
//         <Transition.Child
//           as={Fragment}
//           enter="transition-opacity ease-linear duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-linear duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div
//             className="fixed inset-0 bg-black/40 z-50 lg:hidden"
//             onClick={() => setIsMenuOpen(false)}
//           />
//         </Transition.Child>

//         {/* Menu Panel */}
//         <Transition.Child
//           as={Fragment}
//           enter="transition ease-in-out duration-300 transform"
//           enterFrom="translate-x-full"
//           enterTo="translate-x-0"
//           leave="transition ease-in-out duration-300 transform"
//           leaveFrom="translate-x-0"
//           leaveTo="translate-x-full"
//         >
//           <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-[60] shadow-xl">
//              <div className="flex flex-col h-full">
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-4 border-b">
//                     <h2 className="text-xl font-bold text-gray-800">Menu</h2>
//                     <button onClick={() => setIsMenuOpen(false)}>
//                         <XMarkIcon className="h-6 w-6 text-gray-500"/>
//                     </button>
//                 </div>
//                 {/* Links */}
//                 <div className="flex-grow p-4 space-y-2 overflow-y-auto">
//                     <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Home</Link>
//                     <Link to="/sale" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base text-red-500 font-bold hover:bg-red-50 rounded-lg">SALE</Link>

//                     <div className="pt-2">
//                         <p className="px-4 text-sm font-semibold text-gray-400 uppercase">Shop by Category</p>
//                         <div className="mt-2 space-y-1">
//                             {categories.map((category) => (
//                                 <Link
//                                     key={category.name}
//                                     to={category.path}
//                                     className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-lg"
//                                     onClick={() => setIsMenuOpen(false)}
//                                 >
//                                     {category.name}
//                                 </Link>
//                             ))}
//                         </div>
//                     </div>
//                      {/* Actions for mobile */}
//                     <div className="sm:hidden pt-4 border-t mt-4 space-y-2">
//                          <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg">
//                             <HeartIcon className="w-6 h-6"/> Wishlist
//                          </Link>
//                          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg">
//                             <ShoppingBagIcon className="w-6 h-6"/> Cart
//                          </Link>
//                          <Link to="/account" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg">
//                             <UserIcon className="w-6 h-6"/> Account
//                          </Link>
//                     </div>
//                 </div>
//                 {/* Footer */}
//                 <div className="p-4 border-t">
//                      <Link
//                         to="/combo"
//                         className="block w-full px-4 py-3 text-white bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-lg text-center font-medium shadow hover:shadow-lg transition-all"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Combo Builder
//                       </Link>
//                 </div>
//              </div>
//           </div>
//         </Transition.Child>
//       </Transition>
//     </>
//   )
// }

// export default Navbar

"use client";

import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  HeartIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

import logo from "../assets/Logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

   const categories = [
    { name: "Men's Clothing", path: "/category/men's-clothing" },
    { name: "Women's Clothing", path: "/category/women's-clothing" },
    { name: "Footwear", path: "/category/footwear" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Kids Wear", path: "/category/kids-wear" },
    { name: "Sports & Active", path: "/category/sports-&-active" },
     ]
  // Helper component for the action icons - updated with new theme colors
  const ActionIcon = ({ icon: Icon, count, tooltip }) => (
    <div className="relative group">
      <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
        <Icon className="h-6 w-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </button>
      <div className="absolute top-full right-1/2 translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );

  return (
    <>
      {/* Top Banner - Updated Theme */}
    <div className="bg-gradient-to-r from-yellow-600 to-amber-800 text-yellow-100 text-center py-2.5 text-sm font-medium tracking-wider relative overflow-hidden">
  🎉 Free Shipping on Orders Above ₹999 | Use Code: <span className="font-extrabold text-yellow-300">FREESHIP</span>
  <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 60%22%3E%3Cpath fill=%22%23facc15%22 fill-opacity=%220.2%22 d=%22M0,32L48,40C96,48,192,64,288,61.3C384,59,480,37,576,37.3C672,38,768,59,864,64C960,69,1056,59,1152,53.3C1248,48,1344,48,1392,48L1440,48V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z%22/%3E%3C/svg%3E')] bg-no-repeat animate-wave"></div>
</div>

<style>
{`
  @keyframes wave {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-wave {
    animation: wave 8s linear infinite;
  }
`}
</style>

      {/* Main Navbar */}
      <nav className="backdrop-blur-xl bg-white/90 shadow-sm sticky top-0 z-50 transition-all">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* --- LOGO UPDATED HERE --- */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Shree Ram Collection Logo"
                className="h-45 w-auto mt-2 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation - Updated Theme */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-700 hover:text-amber-600 font-medium transition-colors">
                  Shop{" "}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <Transition
                  show={isCategoryOpen}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <div className="absolute -left-8 top-full mt-3 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-amber-50 hover:text-amber-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </Transition>
              </div>
              <Link
                to="/about"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Actions - Updated Theme */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              <div className="hidden sm:flex items-center">
                <ActionIcon icon={HeartIcon} count={2} tooltip="Wishlist" />
                <ActionIcon icon={ShoppingBagIcon} count={3} tooltip="Cart" />
                <ActionIcon icon={UserIcon} count={0} tooltip="Account" />
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-amber-600"
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="h-7 w-7" />
                ) : (
                  <Bars3Icon className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay - Updated Theme */}
      <Transition
        show={isSearchOpen}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="fixed top-0 left-0 right-0 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative bg-white rounded-xl shadow-2xl max-w-xl mx-auto mt-[10vh]">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-12 pr-6 py-4 border-none rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>

      {/* Mobile Menu - Updated Theme */}
      <Transition show={isMenuOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-[60] shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  {" "}
                  <XMarkIcon className="h-6 w-6 text-gray-500" />{" "}
                </button>
              </div>
              <div className="flex-grow p-4 space-y-2 overflow-y-auto">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg"
                >
                  Home
                </Link>
                <div className="pt-2">
                  <p className="px-4 text-sm font-semibold text-gray-400 uppercase">
                    Shop by Category
                  </p>
                  <div className="mt-2 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-3 text-base text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="sm:hidden pt-4 border-t mt-4 space-y-2">
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg"
                  >
                    {" "}
                    <HeartIcon className="w-6 h-6" /> Wishlist{" "}
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg"
                  >
                    {" "}
                    <ShoppingBagIcon className="w-6 h-6" /> Cart{" "}
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3 text-base text-gray-700 font-medium hover:bg-gray-100 rounded-lg"
                  >
                    {" "}
                    <UserIcon className="w-6 h-6" /> Account{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};

export default Navbar;



