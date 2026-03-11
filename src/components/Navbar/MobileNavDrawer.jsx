import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { IoCloseOutline, IoPersonOutline, IoBagOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";

const MOBILE_CATEGORIES = [
  { id: "home", label: "Home", path: "/home" },
  { id: "trend", label: "Trend", path: "/home" },
  { id: "Casual", label: "Casual", path: "/section/Casual" },
  { id: "FORMAL", label: "Formal", path: "/section/FORMAL" },
  { id: "Premium", label: "Premium", path: "/section/Premium" },
  // More items
  { id: "Streetwear", label: "Streetwear", path: "/section/Streetwear" },
  { id: "Activewear", label: "Activewear", path: "/section/Activewear" },
  { id: "ACCESSORIES", label: "Accessories", path: "/section/ACCESSORIES" },
  { id: "Footwear", label: "Footwear", path: "/section/Footwear" },
  { id: "Outerwear", label: "Outerwear", path: "/section/Outerwear" },
  { id: "Traditional", label: "Traditional & Cultural", path: "/section/Traditional" },
  { id: "Swimwear", label: "Swimwear", path: "/section/Swimwear" },
  { id: "Lingerie", label: "Lingerie & Loungewear", path: "/section/Lingerie" },
  { id: "PlusSize", label: "Plus Size", path: "/section/PlusSize" },
  { id: "Kids", label: "Kids & Youth", path: "/section/Kids" },
];

export default function MobileNavDrawer({ isOpen, onClose, isAuthenticated, user, handleLogout }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto flex flex-col pt-5 pb-8 border-r border-gray-100"
          >
            <div className="flex items-center justify-between px-6 pb-5 border-b border-gray-100">
              <Link to="/" className="flex flex-col items-start" onClick={onClose}>
                 <span className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  StyleHub
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Auth Section */}
            <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50">
              {!isAuthenticated ? (
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center gap-3 w-full bg-white p-3 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <IoPersonOutline className="text-xl text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">Sign In / Register</span>
                    <span className="text-[11px] text-gray-500">Access your account</span>
                  </div>
                </Link>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-gray-900 leading-tight">{user?.name}</span>
                      <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">{user?.role}</span>
                    </div>
                  </div>
                  
                  {user?.role === "seller" && (
                    <div className="flex flex-col gap-2 mt-2">
                      <Link
                        to="/seller/dashboard"
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors"
                      >
                       Seller Dashboard
                      </Link>
                      <Link
                        to="/add-item"
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <MdAddCircleOutline className="text-lg" /> Add New Item
                      </Link>
                    </div>
                  )}
                  
                  <button
                    onClick={() => {
                        handleLogout();
                        onClose();
                    }}
                    className="mt-1 w-full py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-4">
               <Link to="/bag" onClick={onClose} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
                 <IoBagOutline className="text-xl" /> View Cart
               </Link>
            </div>

            {/* Categories */}
            <div className="flex-1 px-4 py-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2 mb-3">Categories</h3>
              <nav className="flex flex-col space-y-1">
                {MOBILE_CATEGORIES.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={cat.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-50 text-indigo-700 font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {cat.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
