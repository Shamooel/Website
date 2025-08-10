"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext"
import { useNavigate } from "react-router-dom"
import "./Checkout.css"

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "cashOnDelivery",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.1
  const shipping = 0 // Assuming free shipping for now
  const total = subtotal + tax + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = t("fullNameRequired")
    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("invalidEmailFormat")
    }
    if (!formData.phone.trim()) newErrors.phone = t("phoneNumberRequired")
    if (!formData.address.trim()) newErrors.address = t("addressRequired")
    if (!formData.city.trim()) newErrors.city = t("cityRequired")
    if (!formData.zipCode.trim()) newErrors.zipCode = t("zipCodeRequired")
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    // Simulate order placement
    setTimeout(() => {
      console.log("Order placed:", formData, cartItems)
      clearCart() // Clear cart after successful order
      setIsLoading(false)
      navigate("/order-success") // Redirect to a success page (you might want to create this page)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-cart-page">
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
    <div className="checkout-container">
      <h1 className="checkout-title">{t("checkout")}</h1>
      <div className="checkout-content">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>{t("shippingInformation")}</h2>
            <div className="form-group">
              <label htmlFor="fullName">{t("fullName")} *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? "error" : ""}
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">{t("emailAddress")} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t("phoneNumber")} *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="address">{t("address")} *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">{t("city")} *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? "error" : ""}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">{t("zipCode")} *</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={errors.zipCode ? "error" : ""}
                />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>

            <h2>{t("paymentMethod")}</h2>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={formData.paymentMethod === "cashOnDelivery"}
                  onChange={handleInputChange}
                />
                {t("cashOnDelivery")}
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={formData.paymentMethod === "creditCard"}
                  onChange={handleInputChange}
                  disabled // For demo purposes
                />
                {t("creditCard")} ({t("comingSoon")})
              </label>
            </div>

            <button type="submit" className="place-order-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  {t("placingOrder")}...
                </>
              ) : (
                t("placeOrder")
              )}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="order-summary-card">
            <h3>{t("orderSummary")}</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="summary-item">
                  <img src={item.images ? item.images[0] : "/placeholder.svg"} alt={item.name} />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-variants">
                      {item.selectedSize && `${t("size")}: ${item.selectedSize}`}
                      {item.selectedColor && `, ${t("color")}: ${item.selectedColor}`}
                    </p>
                    <p className="item-quantity">
                      {t("qty")}: {item.quantity}
                    </p>
                  </div>
                  <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
                