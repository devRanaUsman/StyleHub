import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { logoutUser } from "../store/authSlice";

import TopBar from "./Navbar/TopBar";
import CategoryNav from "./Navbar/CategoryNav";
import MobileNavDrawer from "./Navbar/MobileNavDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const bagitems = useSelector((store) => store.Bag.bagItems);
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle sticky navbar on scroll with backdrop blur
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logoutUser());
      navigate("/profile");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-white shadow-md py-0" 
            : "bg-white py-1"
        }`}
      >
        <TopBar 
          bagitemsCount={bagitems.length} 
          isAuthenticated={isAuthenticated} 
          user={user} 
          handleLogout={handleLogout} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <CategoryNav />
      </header>

      <MobileNavDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        isAuthenticated={isAuthenticated} 
        user={user} 
        handleLogout={handleLogout}
      />
    </>
  );
}
