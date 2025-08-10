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
      image: "https://us.junaidjamshed.com/cdn/shop/products/JSU-23-933_3_7c1d8e11-dd1a-4b36-9887-beeab32a768a.jpg?v=1751952559",
      category: "traditional-wear",
    },
    {
      id: 2,
      name: "Modern Western Dress",
      price: 12000,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2084s_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "formal-wear",
    },
    {
      id: 3,
      name: "Casual Kurti",
      price: 3500,
      image: "https://www.junaidjamshed.com/media/catalog/product/2/5/25-191s_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "accessories",
    },
    {
      id: 4,
      name: "Formal Silk Gown",
      price: 25000,
      image: "https://www.junaidjamshed.com/media/catalog/product/2/5/25-159_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "formal-wear",
    },
    {
      id: 5,
      name: "Kurti with Chiffon Dupatta",
      price: 6500,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/d/jds-25-1057_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "casual-wear",
    },
    {
      id: 6,
      name: "Embroidered Lawn Suit",
      price: 15000,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/d/jds-25-1060_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "traditional-wear",
    },
    {
      id: 7,
      name: "Chiffon Maxi Dress",
      price: 18000,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2082s_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "formal-wear",
    },
    {
      id: 8,
      name: "Cotton kurti",
      price: 4500,
      image: "https://www.junaidjamshed.com/media/catalog/product/2/5/25-914s_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "accessories",
    },
    {
      id: 9,
      name: "kurti Dress",
      price: 3500,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2115_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "casual-wear",
    },
    {
      id: 10,
      name: "Kurti",
      price: 22000,
      image: "https://www.junaidjamshed.com/media/catalog/product/2/5/25-170s_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "formal-wear",
    },
    {
      id: 11,
      name: "Printed Lawn Kurti",
      price: 5500,
      image: "https://www.junaidjamshed.com/media/catalog/product/2/5/25-174_3_a.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "accessories",
    },
    {
      id: 12,
      name: "Kurti with Embroidery",
      price: 4800,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2040_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "casual-wear",
    },
     {
      id: 13,
      name: "Basic Cotton Kurti",
      price: 2400,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/d/jds-25-1033_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "casual-wear",
    },
      {
      id: 14,
      name: "Embellished Evening Kurti",
      price: 6800,
      image: "https://www.junaidjamshed.com/media/catalog/product/2/4/24-7041_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
      category: "casual-wear",
    },
      {
      id: 15,
      name: "Wool Shawl",
      price: 7800,
      image: "https://www.junaidjamshed.com/media/catalog/product/j/d/jds-25-1047_1_.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
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
