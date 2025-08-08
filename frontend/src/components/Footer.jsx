"use client"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import "./Footer.css"

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Khumaymi</h3>
            <p className="footer-description">
              Luxury Pakistani fashion for the modern woman. Discover our exclusive collection of traditional and
              contemporary clothing.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                📘
              </a>
              <a href="#" className="social-link">
                📷
              </a>
              <a href="#" className="social-link">
                🐦
              </a>
              <a href="#" className="social-link">
                📌
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t("categories")}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/category/traditional-wear">{t("traditionalWear")}</Link>
              </li>
              <li>
                <Link to="/category/formal-wear">{t("formalWear")}</Link>
              </li>
              <li>
                <Link to="/category/casual-wear">{t("casualWear")}</Link>
              </li>
              <li>
                <Link to="/category/accessories">{t("accessories")}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Customer Care</h4>
            <ul className="footer-links">
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns">Returns</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Newsletter</h4>
            <p className="newsletter-text">Subscribe to get updates on new arrivals and exclusive offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 Khumaymi. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
