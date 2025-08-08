"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import "./Products.css"

const Products = () => {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

  // Sample products data
  const sampleProducts = [
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
    {
      id: 5,
      name: "Cotton Lawn Suit",
      price: 6500,
      image: "/placeholder.svg?height=400&width=300",
      category: "casual-wear",
    },
    {
      id: 6,
      name: "Silk Saree",
      price: 15000,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
    },
    {
      id: 7,
      name: "Party Wear Gown",
      price: 18000,
      image: "/placeholder.svg?height=400&width=300",
      category: "formal-wear",
    },
    {
      id: 8,
      name: "Handcrafted Jewelry Set",
      price: 4500,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
    },
    {
      id: 9,
      name: "Casual Kurti",
      price: 3500,
      image: "/placeholder.svg?height=400&width=300",
      category: "casual-wear",
    },
    {
      id: 10,
      name: "Bridal Sharara",
      price: 22000,
      image: "/placeholder.svg?height=400&width=300",
      category: "formal-wear",
    },
    {
      id: 11,
      name: "Embroidered Shawl",
      price: 5500,
      image: "/placeholder.svg?height=400&width=300",
      category: "accessories",
    },
    {
      id: 12,
      name: "Lawn Collection Dress",
      price: 4800,
      image: "/placeholder.svg?height=400&width=300",
      category: "casual-wear",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts)
      setFilteredProducts(sampleProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (filterBy !== "all") {
      filtered = filtered.filter((product) => product.category === filterBy)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, sortBy, filterBy])

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">{t("loading")}</div>
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">{t("products")}</h1>
        <p className="products-subtitle">Discover our complete collection of luxury Pakistani fashion</p>
      </div>

      <div className="products-filters">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="traditional-wear">{t("traditionalWear")}</option>
            <option value="formal-wear">{t("formalWear")}</option>
            <option value="casual-wear">{t("casualWear")}</option>
            <option value="accessories">{t("accessories")}</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Sort by:</label>
          <select id="sort-filter" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h3>{t("noResults")}</h3>
          <p>Try adjusting your filters to see more products.</p>
        </div>
      )}
    </div>
  )
}

export default Products
