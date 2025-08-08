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
      name: "Elegant Embroidered Kurti",
      price: 8500,
      image: "https://us.junaidjamshed.com/cdn/shop/products/JSU-23-933_3_7c1d8e11-dd1a-4b36-9887-beeab32a768a.jpg?v=1751952559",
      category: "traditional-wear",
    },
    {
      id: 2,
      name: "Designer Formal Dress",
      price: 12000,
      image: "https://us.junaidjamshed.com/cdn/shop/files/JSS-24-340_1.jpg?v=1751952561",
      category: "formal-wear",
    },
    {
      id: 3,
      name: "Casual Chiffon Dupatta",
      price: 3500,
      image: "https://au.junaidjamshed.com/cdn/shop/files/JWS-24-3055_1.jpg?v=1754484588",
      category: "accessories",
    },
    {
      id: 4,
      name: "Wedding Collection Lehenga",
      price: 25000,
      image: "https://i.pinimg.com/474x/03/39/93/0339931449d09a5eb85adc7c1b3780bd.jpg",
      category: "formal-wear",
    },
  ]

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel data
  const carouselSlides = [
    {
      id: 1,
      image: "https://janan.com/cdn/shop/products/JSS-23-418_2_1800x1800.jpg?v=1741631688",
      title: "New Bridal Collection 2024",
      subtitle: "Exquisite designs for your special day",
      buttonText: "Explore Bridal",
      link: "/category/formal-wear"
    },
    {
      id: 2,
      image: "https://us.junaidjamshed.com/cdn/shop/files/25-514_1.jpg?v=1751525006",
      title: "Summer Lawn Collection",
      subtitle: "Light, breezy, and beautifully crafted",
      buttonText: "Shop Lawn",
      link: "/category/casual-wear"
    },
    {
      id: 3,
      image: "https://us.junaidjamshed.com/cdn/shop/files/JSS-24-336_1.jpg?v=1751952564",
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
          <img src="https://www.gulahmedshop.com/media/blog/cache/840x620/magefan_blog/Blog_Cover_2.png" alt="Hero Background" className="hero-image" />
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
              <img src="https://www.junaidjamshed.com/media/wysiwyg/STITCHED_36.jpg" alt="Traditional Wear" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("traditionalWear")}</h3>
              </div>
            </Link>

            <Link to="/category/formal-wear" className="category-card">
              <img src="https://www.junaidjamshed.com/media/wysiwyg/UNSTITCHED_20.jpg" alt="Formal Wear" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("formalWear")}</h3>
              </div>
            </Link>

            <Link to="/category/casual-wear" className="category-card">
              <img src="https://www.junaidjamshed.com/media/wysiwyg/KURTI_37.jpg" alt="Casual Wear" className="category-image" />
              <div className="category-overlay">
                <h3 className="category-title">{t("casualWear")}</h3>
              </div>
            </Link>

            <Link to="/category/accessories" className="category-card">
              <img src="https://www.junaidjamshed.com/media/wysiwyg/2PCS_3.jpg" alt="Accessories" className="category-image" />
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
