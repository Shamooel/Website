"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext"
import "./Cart.css"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { t } = useLanguage()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some beautiful items to your cart and they will appear here.</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">{t("cart")}</h1>
        <p className="cart-subtitle">{cartItems.length} items in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
              <div className="item-image">
                <img src={item.image || "https://us.junaidjamshed.com/cdn/shop/products/JSU-23-933_3_7c1d8e11-dd1a-4b36-9887-beeab32a768a_720x.jpg?v=1751952559"} alt={item.name} />
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-variants">
                  {item.selectedSize && <span className="variant">Size: {item.selectedSize}</span>}
                  {item.selectedColor && <span className="variant">Color: {item.selectedColor}</span>}
                </div>
                <div className="item-price">{formatPrice(item.price)}</div>
              </div>

              <div className="item-quantity">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="item-total">{formatPrice(item.price * item.quantity)}</div>

              <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="summary-row">
              <span>Tax:</span>
              <span>{formatPrice(getCartTotal() * 0.1)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total:</span>
              <span>{formatPrice(getCartTotal() * 1.1)}</span>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>

          <div className="shipping-info">
            <h4>Free Shipping</h4>
            <p>Enjoy free shipping on all orders above PKR 5,000</p>
          </div>

          <div className="security-info">
            <h4>Secure Checkout</h4>
            <p>Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
