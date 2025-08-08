"use client"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import "./NotFound.css"

const NotFound = () => {
  const { t } = useLanguage()

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <span className="not-found-number">404</span>
        </div>

        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-description">The page you're looking for doesn't exist or has been moved.</p>

        <div className="not-found-actions">
          <Link to="/home" className="back-home-btn">
            {t("backToHome")}
          </Link>
          <Link to="/products" className="browse-products-btn">
            Browse Products
          </Link>
        </div>

        <div className="not-found-suggestions">
          <h3>You might be interested in:</h3>
          <div className="suggestion-links">
            <Link to="/category/traditional-wear">{t("traditionalWear")}</Link>
            <Link to="/category/formal-wear">{t("formalWear")}</Link>
            <Link to="/category/casual-wear">{t("casualWear")}</Link>
            <Link to="/category/accessories">{t("accessories")}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
