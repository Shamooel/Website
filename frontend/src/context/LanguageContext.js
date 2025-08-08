"use client"

import { createContext, useContext, useState } from "react"
import { translations } from "../data/translations"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang)
  }

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
