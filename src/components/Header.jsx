import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

const NAV_LINKS = ["Home", "Explore", "About Us"];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="Discover Egypt Home">
          <img
            src="/images/DiscoverEgyptLogo.png"
            alt="Discover Egypt"
            className="h-32 w-auto mt-2"
            width={120}
            height={48}
          />
        </a>

        {/* Search Bar - Clickable to navigate */}
        <button
          type="button"
          onClick={handleSearchClick}
          className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 w-64 cursor-pointer hover:bg-gray-200 transition-colors"
          aria-label="Open search"
        >
          <Search size={18} className="text-muted" aria-hidden="true" />
          <span className="text-sm text-muted">What&apos;s on your mind?</span>
        </button>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-800 hover:text-primary transition-colors font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth & Language */}
        <div className="flex items-center gap-4">
          <a
            href="#login"
            className="hidden sm:block text-gray-800 hover:text-primary transition-colors font-medium"
          >
            Login
          </a>
          <a
            href="#signup"
            className="hidden sm:block px-6 py-2 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors font-medium"
          >
            Sign up
          </a>
          <button
            type="button"
            className="flex items-center gap-1 text-muted hover:text-gray-800 transition-colors"
            aria-label="Select language"
          >
            <span>EN</span>
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
