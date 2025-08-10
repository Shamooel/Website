"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { productsData } from "../data/productsData"
import { useLanguage } from "../context/LanguageContext"
import "./Category.css"

const Category = () => {
  const { categoryName } = useParams()
  const { t } = useLanguage()
  const [categoryProducts, setCategoryProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate fetching data based on categoryName
    setTimeout(() => {
      const filteredProducts = productsData.filter((product) => product.category === categoryName)
      setCategoryProducts(filteredProducts)
      setLoading(false)
    }, 500)
  }, [categoryName])

  const getCategoryTitle = (name) => {
    // Convert kebab-case to readable title and translate
    const readableName = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    return t(readableName.replace(/\s/g, "")) || readableName // Try to translate, fallback to readable name
  }

  if (loading) {
    return (
      <div className="category-page">
        <div className="loading-message">{t("loadingProducts")}</div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <h1 className="page-title">{getCategoryTitle(categoryName)}</h1>
      {categoryProducts.length > 0 ? (
        <div className="product-list-grid">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-products-message">{t("noProductsFound")}</p>
      )}
    </div>
  )
}

export default Category
