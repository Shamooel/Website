"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import "./Returns.css"

const Returns = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("policy")

  const returnSteps = [
    {
      step: 1,
      title: t("initiateReturn"),
      description: t("initiateReturnDesc"),
      icon: "📝"
    },
    {
      step: 2,
      title: t("packageItem"),
      description: t("packageItemDesc"),
      icon: "📦"
    },
    {
      step: 3,
      title: t("shipBack"),
      description: t("shipBackDesc"),
      icon: "🚚"
    },
    {
      step: 4,
      title: t("processRefund"),
      description: t("processRefundDesc"),
      icon: "💰"
    }
  ]

  const refundTimeline = [
    { method: t("originalPayment"), time: "5-7 " + t("businessDays") },
    { method: t("bankTransfer"), time: "3-5 " + t("businessDays") },
    { method: t("storeCredit"), time: t("immediate") },
    { method: t("cashOnDelivery"), time: "7-10 " + t("businessDays") }
  ]

  return (
    <div className="returns-container">
      {/* Hero Section */}
      <div className="returns-hero">
        <div className="returns-hero-bg">
          <img
            src="/placeholder.svg?height=400&width=1200"
            alt="Returns"
            className="returns-hero-image"
          />
          <div className="returns-hero-overlay"></div>
        </div>
        <div className="returns-hero-content">
          <h1 className="returns-hero-title">{t("returnsExchanges")}</h1>
          <p className="returns-hero-subtitle">
            {t("returnsSubtitle")}
          </p>
        </div>
      </div>

      <div className="returns-content">
        {/* Navigation Tabs */}
        <div className="returns-tabs">
          <div className="container">
            <div className="tabs-nav">
              <button
                className={`tab-btn ${activeTab === "policy" ? "active" : ""}`}
                onClick={() => setActiveTab("policy")}
              >
                {t("returnPolicy")}
              </button>
              <button
                className={`tab-btn ${activeTab === "process" ? "active" : ""}`}
                onClick={() => setActiveTab("process")}
              >
                {t("returnProcess")}
              </button>
              <button
                className={`tab-btn ${activeTab === "exchanges" ? "active" : ""}`}
                onClick={() => setActiveTab("exchanges")}
              >
                {t("exchanges")}
              </button>
              <button
                className={`tab-btn ${activeTab === "refunds" ? "active" : ""}`}
                onClick={() => setActiveTab("refunds")}
              >
                {t("refunds")}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          <div className="container">
            {activeTab === "policy" && (
              <div className="policy-content">
                <div className="policy-highlights">
                  <div className="highlight-card">
                    <div className="highlight-icon">📅</div>
                    <h3>{t("dayReturnPolicy", { days: 14 })}</h3>
                    <p>{t("dayReturnPolicyDesc")}</p>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">🏷️</div>
                    <h3>{t("originalTags")}</h3>
                    <p>{t("originalTagsDesc")}</p>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">👗</div>
                    <h3>{t("unwornCondition")}</h3>
                    <p>{t("unwornConditionDesc")}</p>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">🚫</div>
                    <h3>{t("customItemsNonReturnable")}</h3>
                    <p>{t("customItemsDesc")}</p>
                  </div>
                </div>

                <div className="policy-details">
                  <h2 className="section-title">{t("returnConditions")}</h2>
                  <div className="conditions-grid">
                    <div className="condition-item">
                      <div className="condition-icon">✅</div>
                      <div className="condition-content">
                        <h4>{t("eligibleReturns")}</h4>
                        <ul>
                          <li>{t("unwornItems")}</li>
                          <li>{t("originalPackaging")}</li>
                          <li>{t("receiptIncluded")}</li>
                          <li>{t("within14Days")}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="condition-item">
                      <div className="condition-icon">❌</div>
                      <div className="condition-content">
                        <h4>{t("nonEligibleReturns")}</h4>
                        <ul>
                          <li>{t("customTailored")}</li>
                          <li>{t("damagedByCustomer")}</li>
                          <li>{t("missingTags")}</li>
                          <li>{t("after14Days")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "process" && (
              <div className="process-content">
                <h2 className="section-title">{t("howToReturn")}</h2>
                <div className="process-timeline">
                  {returnSteps.map((step, index) => (
                    <div key={step.step} className="process-step">
                      <div className="step-number">{step.step}</div>
                      <div className="step-icon">{step.icon}</div>
                      <div className="step-content">
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-description">{step.description}</p>
                      </div>
                      {index < returnSteps.length - 1 && <div className="step-line"></div>}
                    </div>
                  ))}
                </div>

                <div className="return-form-section">
                  <div className="return-form-card">
                    <h3>{t("startReturn")}</h3>
                    <p>{t("startReturnDesc")}</p>
                    <form className="return-form">
                      <div className="form-row">
                        <input 
                          type="text" 
                          placeholder={t("orderNumber")}
                          className="form-input"
                        />
                        <input 
                          type="email" 
                          placeholder={t("emailAddress")}
                          className="form-input"
                        />
                      </div>
                      <select className="form-input">
                        <option value="">{t("reasonForReturn")}</option>
                        <option value="size">{t("wrongSize")}</option>
                        <option value="color">{t("wrongColor")}</option>
                        <option value="quality">{t("qualityIssue")}</option>
                        <option value="damaged">{t("damagedItem")}</option>
                        <option value="other">{t("other")}</option>
                      </select>
                      <textarea 
                        placeholder={t("additionalComments")}
                        className="form-textarea"
                        rows="4"
                      ></textarea>
                      <button type="submit" className="submit-btn">
                        {t("submitReturn")}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "exchanges" && (
              <div className="exchanges-content">
                <h2 className="section-title">{t("exchangeOptions")}</h2>
                <div className="exchange-options">
                  <div className="exchange-card">
                    <div className="exchange-icon">📏</div>
                    <h3>{t("sizeExchange")}</h3>
                    <p>{t("sizeExchangeDesc")}</p>
                    <div className="exchange-benefits">
                      <div className="benefit">✓ {t("freeExchange")}</div>
                      <div className="benefit">✓ {t("sameDayProcessing")}</div>
                      <div className="benefit">✓ {t("priorityShipping")}</div>
                    </div>
                  </div>
                  <div className="exchange-card">
                    <div className="exchange-icon">🎨</div>
                    <h3>{t("colorExchange")}</h3>
                    <p>{t("colorExchangeDesc")}</p>
                    <div className="exchange-benefits">
                      <div className="benefit">✓ {t("subjectToAvailability")}</div>
                      <div className="benefit">✓ {t("noExtraCharges")}</div>
                      <div className="benefit">✓ {t("qualityGuarantee")}</div>
                    </div>
                  </div>
                  <div className="exchange-card">
                    <div className="exchange-icon">🔄</div>
                    <h3>{t("itemExchange")}</h3>
                    <p>{t("itemExchangeDesc")}</p>
                    <div className="exchange-benefits">
                      <div className="benefit">✓ {t("priceDifferenceApplies")}</div>
                      <div className="benefit">✓ {t("storeCredit")}</div>
                      <div className="benefit">✓ {t("flexibleOptions")}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "refunds" && (
              <div className="refunds-content">
                <h2 className="section-title">{t("refundProcess")}</h2>
                <div className="refund-timeline">
                  <h3>{t("refundTimeline")}</h3>
                  <div className="timeline-grid">
                    {refundTimeline.map((item, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-method">{item.method}</div>
                        <div className="timeline-time">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="refund-methods">
                  <h3>{t("refundMethods")}</h3>
                  <div className="methods-grid">
                    <div className="method-card">
                      <div className="method-icon">💳</div>
                      <h4>{t("originalPayment")}</h4>
                      <p>{t("originalPaymentDesc")}</p>
                    </div>
                    <div className="method-card">
                      <div className="method-icon">🏪</div>
                      <h4>{t("storeCredit")}</h4>
                      <p>{t("storeCreditDesc")}</p>
                    </div>
                    <div className="method-card">
                      <div className="method-icon">🏦</div>
                      <h4>{t("bankTransfer")}</h4>
                      <p>{t("bankTransferDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <section className="support-section">
          <div className="container">
            <div className="support-card">
              <h2>{t("needHelp")}</h2>
              <p>{t("supportDesc")}</p>
              <div className="support-options">
                <div className="support-option">
                  <div className="support-icon">💬</div>
                  <div>
                    <h4>{t("liveChat")}</h4>
                    <p>{t("liveChatDesc")}</p>
                  </div>
                </div>
                <div className="support-option">
                  <div className="support-icon">📞</div>
                  <div>
                    <h4>{t("callSupport")}</h4>
                    <p>+92 42 3587 1234</p>
                  </div>
                </div>
                <div className="support-option">
                  <div className="support-icon">✉️</div>
                  <div>
                    <h4>{t("emailSupport")}</h4>
                    <p>returns@khumaymi.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Returns
