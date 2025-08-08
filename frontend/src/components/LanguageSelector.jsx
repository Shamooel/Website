"use client"

import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import "./LanguageSelector.css"

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="language-selector">
      <button className="language-button" onClick={() => setIsOpen(!isOpen)}>
        <span className="language-flag">{currentLang?.flag}</span>
        <span className="language-name">{currentLang?.name}</span>
        <span className="language-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === currentLanguage ? "active" : ""}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
