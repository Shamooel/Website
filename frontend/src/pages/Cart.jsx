"use client"

import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext"
import { Link, useNavigate } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, item.selectedSize, item.selectedColor, newQuantity)
    } else {
      removeFromCart(item.id, item.selectedSize, item.selectedColor)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.1 // Example 10% tax
  const shipping = 0 // Example free shipping
  const total = subtotal + tax + shipping

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>{t("yourCartIsEmpty")}</h2>
          <p>{t("addItemsToCartBeforeCheckout")}</p>
          <button onClick={() => navigate("/products")} className="continue-shopping-btn">
            {t("continueShopping")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">{t("Your cart")}</h1>
      <div className="cart-content">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-image-link">
                <img
                  src={item.images ? item.images[0] : "/placeholder.svg"}
                  alt={item.name}
                  className="cart-item-image"
                />
              </Link>
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-variants">
                  {item.selectedSize && `${t("size")}: ${item.selectedSize}`}
                  {item.selectedColor && `, ${t("color")}: ${item.selectedColor}`}
                </p>
                <div className="cart-item-quantity-control">
                  <button
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="quantity-btn">
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                  className="remove-item-btn"
                >


                  {t("remove")}
                </button>
              </div>
              <div className="cart-item-price">{formatPrice(item.price * item.quantity)}</div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>{t("orderSummary")}</h3>
          <div className="summary-row">
            <span>{t("subtotal")}:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>{t("shipping")}:</span>
            <span>{t("free")}</span>
          </div>
          <div className="summary-row">
            <span>{t("tax")}:</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>{t("total")}:</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button onClick={() => navigate("/checkout")} className="proceed-to-checkout-btn">
            {t("proceedToCheckout")}
          </button>
          <Link to="/products" className="continue-shopping-link">
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
