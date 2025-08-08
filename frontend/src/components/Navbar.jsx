"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"
import "./Navbar.css"

const Navbar = () => {
  const { t } = useLanguage()
  const { getCartItemsCount } = useCart()
  const { wishlistItems } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")
  const [showCategories, setShowCategories] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const categories = [
    { name: "westernWear", path: "/category/western-wear" },
    { name: "traditionalWear", path: "/category/traditional-wear" },
    { name: "casualWear", path: "/category/casual-wear" },
    { name: "formalWear", path: "/category/formal-wear" },
    { name: "accessories", path: "/category/accessories" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <span className="logo-text">Khumaymi</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Navigation Menu */}
        <div className={`navbar-menu ${showMobileMenu ? 'active' : ''}`}>
          <Link to="/home" className="navbar-link" onClick={() => setShowMobileMenu(false)}>
            {t("home")}
          </Link>
          <Link to="/products" className="navbar-link" onClick={() => setShowMobileMenu(false)}>
            {t("products")}
          </Link>

          <div
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
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t(category.name)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="navbar-link" onClick={() => setShowMobileMenu(false)}>
            {t("contact")}
          </Link>
        </div>

        {/* Search and Actions */}
        <div className="navbar-right">
          {/* Search */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          {/* Actions */}
          <div className="navbar-actions">
            <LanguageSelector />
            <ThemeToggle />

            <Link to="/wishlist" className="navbar-icon" title={t("wishlist")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistItems.length > 0 && <span className="icon-badge">{wishlistItems.length}</span>}
            </Link>

            <Link to="/cart" className="navbar-icon" title={t("cart")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {getCartItemsCount() > 0 && <span className="icon-badge">{getCartItemsCount()}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
