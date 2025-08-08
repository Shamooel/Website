"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import "./ProductDetails.css"

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { t } = useLanguage()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])

  // Sample product data
  const sampleProduct = {
    id: Number.parseInt(id),
    name: "Elegant Embroidered Kurta",
    price: 8500,
    originalPrice: 10000,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
    ],
    category: "traditional-wear",
    description:
      "This elegant embroidered kurta features intricate handwork with gold thread embroidery. Made from premium cotton silk fabric, it offers both comfort and style. Perfect for festive occasions and special events.",
    features: [
      "Premium cotton silk fabric",
      "Hand embroidered with gold thread",
      "Comfortable regular fit",
      "Machine washable",
      "Available in multiple sizes",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Blue", code: "#1e3a8a" },
      { name: "Emerald Green", code: "#059669" },
      { name: "Deep Purple", code: "#7c3aed" },
      { name: "Burgundy", code: "#991b1b" },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    fabric: "Cotton Silk",
    care: "Machine wash cold, hang dry",
    origin: "Made in Pakistan",
  }

  const relatedProductsData = [
    {
      id: 101,
      name: "Silk Saree with Gold Border",
      price: 15000,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
    },
    {
      id: 102,
      name: "Handwoven Khaddar Suit",
      price: 7200,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
    },
    {
      id: 103,
      name: "Chiffon Gharara Set",
      price: 12500,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
    },
    {
      id: 104,
      name: "Traditional Anarkali Dress",
      price: 11000,
      image: "/placeholder.svg?height=400&width=300",
      category: "traditional-wear",
    },
  ]

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setProduct(sampleProduct)
      setRelatedProducts(relatedProductsData)
      setSelectedColor(sampleProduct.colors[0].name)
      setSelectedSize(sampleProduct.sizes[2]) // Default to M
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color")
      return
    }

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    }
    addToCart(productToAdd)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading">{t("loading")}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Link to="/products" className="back-to-products">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-details-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/home">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`}>{t(product.category.replace("-", ""))}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-details-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              className="main-product-image"
            />
            <button
              className="wishlist-btn-large"
              onClick={handleWishlistToggle}
              aria-label={isInWishlist(product.id) ? t("removeFromWishlist") : t("addToWishlist")}
            >
              {isInWishlist(product.id) ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${index === activeImageIndex ? "active" : ""}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating">
            <div className="stars">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="rating-text">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="product-pricing">
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="original-price">{formatPrice(product.originalPrice)}</span>}
            {product.originalPrice && (
              <span className="discount">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {/* Size Selection */}
          <div className="product-options">
            <div className="size-selection">
              <h3>{t("size")}</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="color-selection">
              <h3>{t("color")}</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-option ${selectedColor === color.name ? "selected" : ""}`}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
              <span className="selected-color-name">{selectedColor}</span>
            </div>

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h3>{t("quantity")}</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="product-actions">
            <button className="add-to-cart-btn-large" onClick={handleAddToCart} disabled={!product.inStock}>
              {product.inStock ? t("addToCart") : "Out of Stock"}
            </button>
          </div>

          {/* Product Features */}
          <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Product Details */}
          <div className="product-details-info">
            <div className="detail-item">
              <strong>Fabric:</strong> {product.fabric}
            </div>
            <div className="detail-item">
              <strong>Care:</strong> {product.care}
            </div>
            <div className="detail-item">
              <strong>Origin:</strong> {product.origin}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2 className="section-title">Related Products</h2>
        <div className="related-products-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
