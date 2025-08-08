"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import "./Login.css"

const Login = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // Simulate login API call
    setTimeout(() => {
      // Mock authentication - in real app, this would be an API call
      if (formData.email === "demo@khumaymi.com" && formData.password === "demo123") {
        // Success - redirect to home
        navigate("/home")
      } else {
        setError("Invalid email or password. Try demo@khumaymi.com / demo123")
      }
      setIsLoading(false)
    }, 2000)
  }

  const handleSocialLogin = (provider) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      console.log(`Logging in with ${provider}`)
      setIsLoading(false)
      // In real app, this would redirect to OAuth provider
    }, 1000)
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Khumaymi Fashion"
          className="login-bg-image"
        />
        <div className="login-overlay"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <Link to="/home" className="login-logo">
              <span className="logo-text">Khumaymi</span>
            </Link>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account to continue shopping</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your email"
                />
                <span className="input-icon">✉️</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                Remember me
              </label>

              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button
              type="button"
              className="social-btn google"
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
            >
              <span className="social-icon">🔍</span>
              Google
            </button>

            <button
              type="button"
              className="social-btn facebook"
              onClick={() => handleSocialLogin("Facebook")}
              disabled={isLoading}
            >
              <span className="social-icon">📘</span>
              Facebook
            </button>
          </div>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p>Email: demo@khumaymi.com</p>
            <p>Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
