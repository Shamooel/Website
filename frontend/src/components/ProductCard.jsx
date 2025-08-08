"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useLanguage } from "../context/LanguageContext"
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { t } = useLanguage()
  const [showQuickView, setShowQuickView] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    setShowQuickView(true)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <div className="product-card">
        <Link to={`/product/${product.id}`} className="product-link">
          <div className="product-image-container">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" loading="lazy" />
            <div className="product-overlay">
              <button className="quick-view-btn" onClick={handleQuickView}>
                {t("quickView")}
              </button>
            </div>
          </div>

          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{formatPrice(product.price)}</p>
          </div>
        </Link>

        <div className="product-actions">
          <button
            className="wishlist-btn"
            onClick={handleWishlistToggle}
            aria-label={isInWishlist(product.id) ? t("removeFromWishlist") : t("addToWishlist")}
          >
            {isInWishlist(product.id) ? "❤️" : "🤍"}
          </button>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            {t("addToCart")}
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="quick-view-modal" onClick={() => setShowQuickView(false)}>
          <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowQuickView(false)}>
              ×
            </button>
            <div className="quick-view-body">
              <div className="quick-view-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </div>
              <div className="quick-view-details">
                <h2 className="quick-view-title">{product.name}</h2>
                <p className="quick-view-price">{formatPrice(product.price)}</p>
                <p className="quick-view-category">{t(product.category?.replace("-", "") || "")}</p>
                <div className="quick-view-actions">
                  <button className="quick-add-to-cart" onClick={handleAddToCart}>
                    {t("addToCart")}
                  </button>
                  <button className="quick-wishlist" onClick={handleWishlistToggle}>
                    {isInWishlist(product.id) ? t("removeFromWishlist") : t("addToWishlist")}
                  </button>
                  <Link to={`/product/${product.id}`} className="view-details-link">
                    {t("viewDetails") || "View Details"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard
