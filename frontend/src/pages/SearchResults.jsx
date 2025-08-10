"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import "./SearchResults.css"

const SearchResults = () => {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample products for search
  const allProducts = [
    {
      id: 1,
      name: "Elegant Embroidered Kurta",
      price: 8500,
      image: "https://us.junaidjamshed.com/cdn/shop/products/JSU-23-933_3_7c1d8e11-dd1a-4b36-9887-beeab32a768a.jpg?v=1751952559",
      category: "traditional-wear",
      tags: ["kurta", "embroidered", "traditional", "elegant", "gold"],
    },
    {
      id: 2,
      name: "Designer Formal Dress",
      price: 12000,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2080s_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "formal-wear",
      tags: ["dress", "formal", "designer", "luxury", "embroidery"],
    },
    {
      id: 3,
      name: "Casual Chiffon Dupatta",
      price: 3500,
      image: "https://au.junaidjamshed.com/cdn/shop/files/JWS-24-3055_1.jpg?v=1754484588",
      category: "accessories",
      tags: ["dupatta", "chiffon", "casual", "accessories", "border"],
    },
    {
      id: 4,
      name: "Wedding Collection Lehenga",
      price: 25000,
      image: "https://i.pinimg.com/474x/03/39/93/0339931449d09a5eb85adc7c1b3780bd.jpg",
      category: "formal-wear",
      tags: ["lehenga", "wedding", "bridal", "heavy", "embroidery", "gold"],
    },
    {
      id: 5,
      name: "Cotton Lawn Suit",
      price: 6500,
      image: "/placeholder.svg?height=400&width=300",
      category: "casual-wear",
      tags: ["suit", "cotton", "lawn", "floral", "print", "casual"],
    },
    {
      id: 6,
      name: "Silk Saree",
      price: 15000,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
      tags: ["saree", "silk", "traditional", "golden", "border", "elegant"],
    },
  ]

  useEffect(() => {
    setLoading(true)

    // Simulate search delay
    setTimeout(() => {
      if (query.trim()) {
        const searchResults = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )

        setResults(searchResults)

        // Generate suggestions if no results found
        if (searchResults.length === 0) {
          const randomSuggestions = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
          setSuggestions(randomSuggestions)
        } else {
          setSuggestions([])
        }
      } else {
        setResults([])
        setSuggestions([])
      }

      setLoading(false)
    }, 500)
  }, [query])

  if (loading) {
    return (
      <div className="search-container">
        <div className="loading">{t("loading")}</div>
      </div>
    )
  }

  return (
    <div className="search-container">
      <div className="search-header">
        <h1 className="search-title">Search Results for "{query}"</h1>
        {results.length > 0 && (
          <p className="search-count">
            Found {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="search-results">
          <div className="products-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-content">
            <h2>{t("noResults")}</h2>
            <p>We couldn't find any products matching "{query}"</p>

            {suggestions.length > 0 && (
              <div className="suggestions-section">
                <h3>{t("suggestedAlternatives")}</h3>
                <div className="suggestions-grid">
                  {suggestions.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            <div className="search-tips">
              <h4>Search Tips:</h4>
              <ul>
                <li>Check your spelling</li>
                <li>Try more general keywords</li>
                <li>Use different keywords</li>
                <li>Browse our categories instead</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults
