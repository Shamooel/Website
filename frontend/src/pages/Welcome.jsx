"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import "./Welcome.css"

const Welcome = () => {
  const { t } = useLanguage()

  useEffect(() => {
    // Add entrance animation class
    document.body.classList.add("welcome-page")
    return () => {
      document.body.classList.remove("welcome-page")
    }
  }, [])

  return (
    <div className="welcome-container">
      <div className="welcome-background">
        <img src="/placeholder.svg?height=1080&width=1920" alt="Luxury Fashion" className="welcome-bg-image" />
        <div className="welcome-overlay"></div>
      </div>

      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="welcome-title">{t("welcomeTitle")}</h1>
          <p className="welcome-subtitle">{t("welcomeSubtitle")}</p>
          <Link to="/home" className="welcome-button">
            {t("getStarted")}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
