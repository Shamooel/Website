"use client"

import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import LanguageSelector from "../components/LanguageSelector"

import "./Welcome.css"

const Welcome = () => {
  const { t } = useLanguage()

  return (
    <div className="welcome-page">
      <div className="welcome-background">
        <img src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-pakistani-dresses-hanging-on-a-rack-image_2944690.jpg" alt="Welcome Background" className="welcome-bg-image" />
        <div className="welcome-overlay"></div>
      </div>
      <div className="welcome-content">
        <div className="welcome-header">
          <h1 className="welcome-title">Khumaymi</h1>
          <p className="welcome-subtitle">{t("heroSubtitle")}</p>
        </div>
        <div className="welcome-actions">
          <Link to="/home" className="welcome-button primary">
            {t("shopNow")}
          </Link>
          <Link to="/login" className="welcome-button secondary">
            {t("login")}
          </Link>
         
        </div>
        <div className="welcome-options">
          <LanguageSelector />
          
        </div>
      </div>
    </div>
  )
}

export default Welcome
