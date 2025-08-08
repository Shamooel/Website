"use client"

import { Link } from "react-router-dom"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext"
import "./Wishlist.css"

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { t } = useLanguage()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">❤️</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items to your wishlist and they will appear here.</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1 className="wishlist-title">{t("wishlist")}</h1>
        <p className="wishlist-subtitle">{wishlistItems.length} items in your wishlist</p>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <Link to={`/product/${item.id}`}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
              </Link>
              <button
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(item.id)}
                aria-label="Remove from wishlist"
              >
                ❌
              </button>
            </div>

            <div className="wishlist-item-content">
              <Link to={`/product/${item.id}`} className="wishlist-item-link">
                <h3 className="wishlist-item-name">{item.name}</h3>
              </Link>

              <div className="wishlist-item-price">{formatPrice(item.price)}</div>

              <div className="wishlist-item-category">
                <Link to={`/category/${item.category}`} className="category-link">
                  {t(item.category.replace("-", ""))}
                </Link>
              </div>

              <div className="wishlist-item-actions">
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  {t("addToCart")}
                </button>

                <Link to={`/product/${item.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="wishlist-actions">
        <button
          className="clear-wishlist-btn"
          onClick={() => {
            if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
              wishlistItems.forEach((item) => removeFromWishlist(item.id))
            }
          }}
        >
          Clear Wishlist
        </button>

        <Link to="/products" className="continue-shopping-link">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Wishlist
