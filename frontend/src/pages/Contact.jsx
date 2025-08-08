"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"
import "./Contact.css"

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success")
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 2000)
  }

  const handleGetDirections = () => {
    const address = "Main Boulevard, Gulberg III, Lahore, Pakistan"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
  }

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">{t("contactUs")}</h1>
          <p className="contact-hero-subtitle">
            {t("contactSubtitle")}
          </p>
        </div>
      </div>

      <div className="contact-content">
        {/* Contact Information */}
        <div className="contact-info-section">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <h3>{t("visitBoutique")}</h3>
              <p>
                Khumaymi Fashion House
                <br />
                Main Boulevard, Gulberg III
                <br />
                Lahore, Punjab 54000
                <br />
                Pakistan
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <h3>{t("callUs")}</h3>
              <p>
                {t("phone")}: +92 42 3587 1234
                <br />
                WhatsApp: +92 300 1234567
                <br />
                {t("tollFree")}: 0800 12345
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">✉️</div>
              <h3>{t("emailUs")}</h3>
              <p>
                {t("general")}: info@khumaymi.com
                <br />
                {t("orders")}: orders@khumaymi.com
                <br />
                {t("support")}: support@khumaymi.com
              </p>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">🕒</div>
              <h3>{t("businessHours")}</h3>
              <p>
                {t("mondayToSaturday")}: 10:00 AM - 9:00 PM
                <br />
                {t("sunday")}: 12:00 PM - 8:00 PM
                <br />
                {t("ramadanHours")}: 2:00 PM - 10:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Map and Contact Form */}
        <div className="contact-main-section">
          <div className="contact-map-form-grid">
            {/* Dynamic Interactive Map */}
            <div className="contact-map-section">
              <h2 className="section-title">{t("findBoutique")}</h2>
              <div className="map-container">
                {!mapLoaded ? (
                  <div className="map-loading">
                    <div className="loading-spinner-large"></div>
                    <p>Loading map...</p>
                  </div>
                ) : (
                  <div className="interactive-map">
                    <svg viewBox="0 0 400 300" className="map-svg">
                      {/* Background */}
                      <rect width="400" height="300" fill="#f8f9fa"/>
                      
                      {/* Street grid */}
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {/* Main roads */}
                      <line x1="0" y1="150" x2="400" y2="150" stroke="#cbd5e0" strokeWidth="3"/>
                      <line x1="200" y1="0" x2="200" y2="300" stroke="#cbd5e0" strokeWidth="3"/>
                      <line x1="100" y1="0" x2="100" y2="300" stroke="#e2e8f0" strokeWidth="2"/>
                      <line x1="300" y1="0" x2="300" y2="300" stroke="#e2e8f0" strokeWidth="2"/>
                      <line x1="0" y1="75" x2="400" y2="75" stroke="#e2e8f0" strokeWidth="2"/>
                      <line x1="0" y1="225" x2="400" y2="225" stroke="#e2e8f0" strokeWidth="2"/>
                      
                      {/* Buildings */}
                      <rect x="80" y="60" width="40" height="30" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building1')} 
                            className="map-building"/>
                      <rect x="130" y="50" width="35" height="40" fill="#f8fafc" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building2')} 
                            className="map-building"/>
                      <rect x="180" y="55" width="30" height="35" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building3')} 
                            className="map-building"/>
                      <rect x="220" y="45" width="45" height="45" fill="#f8fafc" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building4')} 
                            className="map-building"/>
                      <rect x="280" y="50" width="40" height="40" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building5')} 
                            className="map-building"/>
                      
                      <rect x="70" y="160" width="50" height="40" fill="#f8fafc" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building6')} 
                            className="map-building"/>
                      <rect x="130" y="170" width="35" height="30" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building7')} 
                            className="map-building"/>
                      <rect x="280" y="165" width="45" height="35" fill="#f8fafc" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building8')} 
                            className="map-building"/>
                      
                      <rect x="90" y="240" width="40" height="35" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building9')} 
                            className="map-building"/>
                      <rect x="140" y="235" width="30" height="40" fill="#f8fafc" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building10')} 
                            className="map-building"/>
                      <rect x="190" y="245" width="35" height="30" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building11')} 
                            className="map-building"/>
                      <rect x="240" y="230" width="40" height="45" fill="#f8fafc" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building12')} 
                            className="map-building"/>
                      <rect x="290" y="240" width="35" height="35" fill="#f1f5f9" stroke="#cbd5e0" 
                            onClick={() => handleLocationClick('building13')} 
                            className="map-building"/>
                      
                      {/* Khumaymi location - highlighted building */}
                      <rect x="175" y="125" width="50" height="50" 
                            fill={selectedLocation === 'khumaymi' ? '#f4d03f' : '#d4af37'} 
                            stroke="#b8941f" strokeWidth="2"
                            onClick={() => handleLocationClick('khumaymi')} 
                            className="map-building khumaymi-building"/>
                      <text x="200" y="155" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Khumaymi</text>
                      
                      {/* Parks/Green spaces */}
                      <circle cx="320" cy="120" r="15" fill="#dcfce7" stroke="#86efac" 
                              onClick={() => handleLocationClick('park1')} 
                              className="map-feature"/>
                      <circle cx="80" cy="200" r="12" fill="#dcfce7" stroke="#86efac" 
                              onClick={() => handleLocationClick('park2')} 
                              className="map-feature"/>
                      
                      {/* Metro station */}
                      <rect x="95" y="145" width="10" height="10" fill="#3b82f6" stroke="#1d4ed8" 
                            onClick={() => handleLocationClick('metro')} 
                            className="map-feature"/>
                      <text x="100" y="140" textAnchor="middle" fill="#1d4ed8" fontSize="6">M</text>
                    </svg>
                    
                    {/* Animated location marker */}
                    <div className="location-marker">
                      <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 12 20 12 20s12-13.373 12-20C24 5.373 18.627 0 12 0z" fill="#d4af37"/>
                        <circle cx="12" cy="12" r="6" fill="white"/>
                        <circle cx="12" cy="12" r="3" fill="#d4af37"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className="map-info-overlay">
                  <h4>Khumaymi Fashion House</h4>
                  <p>Main Boulevard, Gulberg III, Lahore</p>
                  <div className="map-actions">
                    <button className="directions-btn" onClick={handleGetDirections}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {t("getDirections")}
                    </button>
                    <button className="call-btn" onClick={() => window.open('tel:+924235871234')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Call Now
                    </button>
                  </div>
                </div>
                
                <div className="map-features">
                  <div className="map-feature">
                    <span className="feature-icon">🚗</span>
                    <span>{t("freeParking")}</span>
                  </div>
                  <div className="map-feature">
                    <span className="feature-icon">🚇</span>
                    <span>{t("nearMetro")}</span>
                  </div>
                  <div className="map-feature">
                    <span className="feature-icon">♿</span>
                    <span>{t("wheelchairAccessible")}</span>
                  </div>
                </div>

                {selectedLocation && (
                  <div className="location-info">
                    <div className="location-info-content">
                      <button 
                        className="close-info" 
                        onClick={() => setSelectedLocation(null)}
                      >
                        ×
                      </button>
                      {selectedLocation === 'khumaymi' && (
                        <div>
                          <h4>🏪 Khumaymi Fashion House</h4>
                          <p>Our main boutique location</p>
                          <p>📍 Main Boulevard, Gulberg III</p>
                          <p>🕒 Open: 10 AM - 9 PM</p>
                        </div>
                      )}
                      {selectedLocation === 'metro' && (
                        <div>
                          <h4>🚇 Kalma Chowk Metro Station</h4>
                          <p>Just 2 minutes walk from our store</p>
                          <p>🚶‍♀️ 150m from Khumaymi</p>
                        </div>
                      )}
                      {selectedLocation === 'park1' && (
                        <div>
                          <h4>🌳 Gulberg Park</h4>
                          <p>Beautiful green space nearby</p>
                          <p>Perfect for a stroll after shopping</p>
                        </div>
                      )}
                      {selectedLocation === 'park2' && (
                        <div>
                          <h4>🌳 Mini Park</h4>
                          <p>Small neighborhood park</p>
                          <p>Great for families</p>
                        </div>
                      )}
                      {selectedLocation.startsWith('building') && (
                        <div>
                          <h4>🏢 Commercial Building</h4>
                          <p>Mixed-use commercial space</p>
                          <p>Various shops and offices</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="section-title">{t("sendMessage")}</h2>
              
              {submitStatus === "success" && (
                <div className="success-message">
                  <span className="success-icon">✅</span>
                  {t("messageSuccess")}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{t("fullName")} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder={t("enterFullName")}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">{t("emailAddress")} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder={t("enterEmail")}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">{t("phoneNumber")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+92 300 1234567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">{t("subject")} *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    >
                      <option value="">{t("selectSubject")}</option>
                      <option value="general">{t("generalInquiry")}</option>
                      <option value="order">{t("orderSupport")}</option>
                      <option value="custom">{t("customDesign")}</option>
                      <option value="wholesale">{t("wholesaleInquiry")}</option>
                      <option value="complaint">{t("complaint")}</option>
                      <option value="feedback">{t("feedback")}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t("message")} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows="6"
                    placeholder={t("tellUsHow")}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      {t("sendingMessage")}
                    </>
                  ) : (
                    t("sendMessage")
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="section-title">{t("faq")}</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>{t("customTailoringQuestion")}</h4>
              <p>{t("customTailoringAnswer")}</p>
            </div>
            <div className="faq-item">
              <h4>{t("deliveryChargesQuestion")}</h4>
              <p>{t("deliveryChargesAnswer")}</p>
            </div>
            <div className="faq-item">
              <h4>{t("internationalOrdersQuestion")}</h4>
              <p>{t("internationalOrdersAnswer")}</p>
            </div>
            <div className="faq-item">
              <h4>{t("returnExchangeQuestion")}</h4>
              <p>{t("returnExchangeAnswer")}</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-section">
          <h2 className="section-title">{t("followUs")}</h2>
          <p className="social-subtitle">{t("stayConnected")}</p>
          <div className="social-links-large">
            <a href="#" className="social-link-large facebook">
              <div className="social-icon-wrapper">
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="social-info">
                <h4>Facebook</h4>
                <p>@KhumaymiOfficial</p>
              </div>
            </a>
            <a href="#" className="social-link-large instagram">
              <div className="social-icon-wrapper">
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="social-info">
                <h4>Instagram</h4>
                <p>@khumaymi_fashion</p>
              </div>
            </a>
            <a href="#" className="social-link-large whatsapp">
              <div className="social-icon-wrapper">
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div className="social-info">
                <h4>WhatsApp</h4>
                <p>+92 300 1234567</p>
              </div>
            </a>
            <a href="#" className="social-link-large youtube">
              <div className="social-icon-wrapper">
                <svg className="social-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="social-info">
                <h4>YouTube</h4>
                <p>Khumaymi Fashion</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
