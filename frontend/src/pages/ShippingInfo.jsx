"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import "./ShippingInfo.css"

const ShippingInfo = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("domestic")

  const shippingZones = {
    zone1: {
      name: t("zone1"),
      cities: ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"],
      standardTime: "2-3 " + t("businessDays"),
      expressTime: "1-2 " + t("businessDays"),
      standardCost: "PKR 200",
      expressCost: "PKR 400"
    },
    zone2: {
      name: t("zone2"),
      cities: ["Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"],
      standardTime: "3-4 " + t("businessDays"),
      expressTime: "2-3 " + t("businessDays"),
      standardCost: "PKR 300",
      expressCost: "PKR 500"
    },
    zone3: {
      name: t("zone3"),
      cities: [t("otherCities")],
      standardTime: "4-6 " + t("businessDays"),
      expressTime: "3-4 " + t("businessDays"),
      standardCost: "PKR 400",
      expressCost: "PKR 600"
    }
  }

  const trackingSteps = [
    {
      step: 1,
      title: t("orderConfirmed"),
      description: t("orderConfirmedDesc"),
      icon: "✅"
    },
    {
      step: 2,
      title: t("processing"),
      description: t("processingDesc"),
      icon: "📦"
    },
    {
      step: 3,
      title: t("shipped"),
      description: t("shippedDesc"),
      icon: "🚚"
    },
    {
      step: 4,
      title: t("delivered"),
      description: t("deliveredDesc"),
      icon: "🎉"
    }
  ]

  return (
    <div className="shipping-container">
      {/* Hero Section */}
      <div className="shipping-hero">
        <div className="shipping-hero-bg">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Shipping"
            className="shipping-hero-image"
          />
          <div className="shipping-hero-overlay"></div>
        </div>
        <div className="shipping-hero-content">
          <h1 className="shipping-hero-title">{t("shippingInfo")}</h1>
          <p className="shipping-hero-subtitle">
            {t("shippingSubtitle")}
          </p>
        </div>
      </div>

      <div className="shipping-content">
        {/* Shipping Options */}
        <section className="shipping-options">
          <div className="container">
            <h2 className="section-title">{t("deliveryOptions")}</h2>
            <div className="options-grid">
              <div className="option-card">
                <div className="option-icon">🚚</div>
                <h3>{t("standardDelivery")}</h3>
                <p className="option-price">PKR 200 - 400</p>
                <p className="option-time">2-6 {t("businessDays")}</p>
                <ul className="option-features">
                  <li>{t("trackingIncluded")}</li>
                  <li>{t("securePackaging")}</li>
                  <li>{t("doorToDoor")}</li>
                </ul>
              </div>

              <div className="option-card featured">
                <div className="featured-badge">{t("popular")}</div>
                <div className="option-icon">⚡</div>
                <h3>{t("expressDelivery")}</h3>
                <p className="option-price">PKR 400 - 600</p>
                <p className="option-time">1-4 {t("businessDays")}</p>
                <ul className="option-features">
                  <li>{t("priorityHandling")}</li>
                  <li>{t("realTimeTracking")}</li>
                  <li>{t("premiumPackaging")}</li>
                  <li>{t("smsUpdates")}</li>
                </ul>
              </div>

              <div className="option-card">
                <div className="option-icon">🎁</div>
                <h3>{t("freeDelivery")}</h3>
                <p className="option-price">{t("free")}</p>
                <p className="option-time">3-7 {t("businessDays")}</p>
                <ul className="option-features">
                  <li>{t("ordersAbove")} PKR 5,000</li>
                  <li>{t("standardTracking")}</li>
                  <li>{t("ecoFriendlyPackaging")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Zones */}
        <section className="shipping-zones">
          <div className="container">
            <h2 className="section-title">{t("shippingZones")}</h2>
            <div className="zones-tabs">
              <button
                className={`zone-tab ${activeTab === "domestic" ? "active" : ""}`}
                onClick={() => setActiveTab("domestic")}
              >
                {t("domesticShipping")}
              </button>
              <button
                className={`zone-tab ${activeTab === "international" ? "active" : ""}`}
                onClick={() => setActiveTab("international")}
              >
                {t("internationalShipping")}
              </button>
            </div>

            {activeTab === "domestic" && (
              <div className="zones-content">
                <div className="zones-grid">
                  {Object.entries(shippingZones).map(([key, zone]) => (
                    <div key={key} className="zone-card">
                      <h3 className="zone-title">{zone.name}</h3>
                      <div className="zone-cities">
                        <strong>{t("cities")}:</strong>
                        <p>{zone.cities.join(", ")}</p>
                      </div>
                      <div className="zone-details">
                        <div className="zone-detail">
                          <span className="detail-label">{t("standard")}:</span>
                          <span className="detail-value">{zone.standardTime} - {zone.standardCost}</span>
                        </div>
                        <div className="zone-detail">
                          <span className="detail-label">{t("express")}:</span>
                          <span className="detail-value">{zone.expressTime} - {zone.expressCost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "international" && (
              <div className="international-content">
                <div className="international-info">
                  <h3>{t("worldwideDelivery")}</h3>
                  <p>{t("internationalDesc")}</p>
                  
                  <div className="international-regions">
                    <div className="region-card">
                      <h4>{t("southAsia")}</h4>
                      <p>{t("deliveryTime")}: 5-8 {t("businessDays")}</p>
                      <p>{t("shippingCost")}: $25 - $40</p>
                    </div>
                    <div className="region-card">
                      <h4>{t("middleEast")}</h4>
                      <p>{t("deliveryTime")}: 7-10 {t("businessDays")}</p>
                      <p>{t("shippingCost")}: $35 - $50</p>
                    </div>
                    <div className="region-card">
                      <h4>{t("europe")}</h4>
                      <p>{t("deliveryTime")}: 10-14 {t("businessDays")}</p>
                      <p>{t("shippingCost")}: $45 - $65</p>
                    </div>
                    <div className="region-card">
                      <h4>{t("northAmerica")}</h4>
                      <p>{t("deliveryTime")}: 12-16 {t("businessDays")}</p>
                      <p>{t("shippingCost")}: $50 - $75</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Order Tracking */}
        <section className="order-tracking">
          <div className="container">
            <h2 className="section-title">{t("orderTracking")}</h2>
            <div className="tracking-timeline">
              {trackingSteps.map((step, index) => (
                <div key={step.step} className="tracking-step">
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                  {index < trackingSteps.length - 1 && <div className="step-connector"></div>}
                </div>
              ))}
            </div>
            
            <div className="tracking-info">
              <div className="tracking-card">
                <h3>{t("trackYourOrder")}</h3>
                <p>{t("trackingDesc")}</p>
                <div className="tracking-input">
                  <input 
                    type="text" 
                    placeholder={t("enterTrackingNumber")}
                    className="tracking-field"
                  />
                  <button className="track-btn">{t("track")}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packaging */}
        <section className="packaging-section">
          <div className="container">
            <h2 className="section-title">{t("premiumPackaging")}</h2>
            <div className="packaging-grid">
              <div className="packaging-card">
                <div className="packaging-icon">📦</div>
                <h3>{t("luxuryBoxes")}</h3>
                <p>{t("luxuryBoxesDesc")}</p>
              </div>
              <div className="packaging-card">
                <div className="packaging-icon">🌿</div>
                <h3>{t("ecoFriendly")}</h3>
                <p>{t("ecoFriendlyDesc")}</p>
              </div>
              <div className="packaging-card">
                <div className="packaging-icon">🎀</div>
                <h3>{t("giftWrapping")}</h3>
                <p>{t("giftWrappingDesc")}</p>
              </div>
              <div className="packaging-card">
                <div className="packaging-icon">🔒</div>
                <h3>{t("securePackaging")}</h3>
                <p>{t("securePackagingDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="shipping-faq">
          <div className="container">
            <h2 className="section-title">{t("shippingFAQ")}</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>{t("howLongShipping")}</h4>
                <p>{t("shippingTimeAnswer")}</p>
              </div>
              <div className="faq-item">
                <h4>{t("shippingCostQuestion")}</h4>
                <p>{t("shippingCostAnswer")}</p>
              </div>
              <div className="faq-item">
                <h4>{t("internationalShippingQuestion")}</h4>
                <p>{t("internationalShippingAnswer")}</p>
              </div>
              <div className="faq-item">
                <h4>{t("trackingQuestion")}</h4>
                <p>{t("trackingAnswer")}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ShippingInfo
