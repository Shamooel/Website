"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"
import "./Navbar.css"

const Navbar = () => {
  const { getCartItemsCount } = useCart()
  const { wishlistItems } = useWishlist()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  const cartItemCount = getCartItemsCount()
  const wishlistCount = wishlistItems.length

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMobileMenuOpen(false) // Close menu after search
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const categories = [
    { name: "westernWear", path: "/category/western-wear" },
    { name: "traditionalWear", path: "/category/traditional-wear" },
    { name: "casualWear", path: "/category/casual-wear" },
    { name: "formalWear", path: "/category/formal-wear" },
    { name: "accessories", path: "/category/accessories" },
  ]

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label={t("toggleNavigation")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <span className="logo-text">Khumaymi</span>
        </Link>

        {/* Navigation Menu */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/home" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/products" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              {t("products")}
            </Link>
          </li>

          <li
            className="navbar-dropdown"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <span className="navbar-link dropdown-trigger">{t("women")}</span>
            {showCategories && (
              <div className="dropdown-menu">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="dropdown-link"
                    onClick={() => {
                      setShowCategories(false)
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {t(category.name)}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link to="/contact" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              {t("contact")}
            </Link>
          </li>
          {/* Added Login and Signup links */}
          <li>
            <Link to="/login" className="navbar-link" onClick={() => setIsMobileMenuOpen(false)}>
              {t("login")}
            </Link>
          </li>
         
        </ul>

        {/* Search and Actions */}
        <div className="navbar-right">
          {/* Search */}
          <form className="navbar-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label={t("search")}
            />
            <button type="submit" className="search-button" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>

          {/* Actions */}
          <div className="navbar-actions">
            <LanguageSelector />
            <ThemeToggle />

            <Link to="/wishlist" className="navbar-icon" title={t("wishlist")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
            </Link>

            <Link to="/cart" className="navbar-icon" title={t("cart")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartItemCount > 0 && <span className="icon-badge">{cartItemCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
