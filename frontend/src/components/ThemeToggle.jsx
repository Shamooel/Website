"use client"
import { useTheme } from "../context/ThemeContext"
import "./ThemeToggle.css"

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="theme-icon">{isDarkMode ? "☀️" : "🌙"}</span>
    </button>
  )
}

export default ThemeToggle
