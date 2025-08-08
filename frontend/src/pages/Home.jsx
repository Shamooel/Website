"use client"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import "./Home.css"
import { useState, useEffect } from "react"

const Home = () => {
  const { t } = useLanguage()

  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Elegant Embroidered Kurta",
      price: 8500,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
    },
    {
      id: 2,
      name: "Designer Formal Dress",
      price: 12000,
      image: "/placeholder.svg?height=400&width=300",
      category: "formal-wear",
    },
    {
      id: 3,
      name: "Casual Chiffon Dupatta",
      price: 3500,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
    },
    {
      id: 4,
      name: "Wedding Collection Lehenga",
      price: 25000,
      image: "/placeholder.svg?height=400&width=300",
      category: "formal-wear",
    },
  ]

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel data
  const carouselSlides = [
    {
      id: 1,
      image: "/placeholder.svg?height=600&width=1200",
      title: "New Bridal Collection 2024",
      subtitle: "Exquisite designs for your special day",
      buttonText: "Explore Bridal",
      link: "/category/formal-wear"
    },
    {
      id: 2,
      image: "/placeholder.svg?height=600&width=1200",
      title: "Summer Lawn Collection",
      subtitle: "Light, breezy, and beautifully crafted",
      buttonText: "Shop Lawn",
      link: "/category/casual-wear"
    },
    {
      id: 3,
      image: "/placeholder.svg?height=600&width=1200",
      title: "Luxury Formal Wear",
      subtitle: "Elegance redefined for modern women",
      buttonText: "View Collection",
      link: "/category/formal-wear"
    }
  ]

  // useEffect for auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Carousel functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/placeholder.svg?height=800&width=1200" alt="Hero Background" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">{t("heroTitle")}</h1>
          <p className="hero-subtitle">{t("heroSubtitle")}</p>
          <Link to="/products" className="hero-button">
            {t("shopNow")}
          </Link>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-wrapper">
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="carousel-slide">
                  <div className="slide-image">
                    <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
                    <div className="slide-overlay"></div>
                  </div>
                  <div className="slide-content">
                    <h2 className="slide-title">{slide.title}</h2>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <Link to={slide.link} className="slide-button">
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="carousel-nav next" onClick={nextSlide} aria-label="Next slide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="carousel-dots">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">{t("featuredProducts")}</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/products" className="view-all-button">
              {t("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">{t("categories")}</h2>
          <div className="categories-grid">
            <Link to="/category/traditional-wear" className="category-card">
              <img src="/placeholder.svg?height=300&width=400" alt="Traditional Wear" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("traditionalWear")}</h3>
              </div>
            </Link>

            <Link to="/category/formal-wear" className="category-card">
              <img src="/placeholder.svg?height=300&width=400" alt="Formal Wear" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("formalWear")}</h3>
              </div>
            </Link>

            <Link to="/category/casual-wear" className="category-card">
              <img src="/placeholder.svg?height=300&width=400" alt="Casual Wear" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("casualWear")}</h3>
              </div>
            </Link>

            <Link to="/category/accessories" className="category-card">
              <img src="/placeholder.svg?height=300&width=400" alt="Accessories" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("accessories")}</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
