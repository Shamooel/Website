"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import Modal from "../components/Modal"
import SizeGuide from "./SizeGuide"
import { productsData } from "../data/productsData" // Import products data
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
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Simulate API call by finding the product in the local data
    const foundProduct = productsData.find((p) => p.id === id) // Ensure ID type matches (string vs number)

    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors[0] || "") // Default to first available color
      setSelectedSize(foundProduct.sizes[0] || "") // Default to first available size
      setActiveImageIndex(0) // Reset active image
      // Filter related products from the full dataset
      const filteredRelated = productsData.filter(
        (p) => p.category === foundProduct.category && p.id !== foundProduct.id,
      )
      setRelatedProducts(filteredRelated)
    } else {
      setProduct(null) // Product not found
    }
    setLoading(false)
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert(t("pleaseSelectSize"))
      return
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert(t("pleaseSelectColor"))
      return
    }

    const productToAdd = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    }
    addToCart(productToAdd)
    alert(t("addedToCart", { productName: product.name }))
  }

  const handleWishlistToggle = () => {
    if (!product) return
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      alert(t("removedFromWishlist", { productName: product.name }))
    } else {
      addToWishlist(product)
      alert(t("addedToWishlist", { productName: product.name }))
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
          <h2>{t("productNotFound")}</h2>
          <Link to="/products" className="back-to-products">
            {t("backToProducts")}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-details-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/home">{t("home")}</Link>
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
              {product.rating} ({product.reviews} {t("reviews")})
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
          {product.sizes && product.sizes.length > 0 && (
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
                <button className="size-guide-link" onClick={() => setIsSizeGuideModalOpen(true)}>
                  {t("sizeGuide")}
                </button>
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="color-selection">
              <h3>{t("color")}</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? "selected" : ""}`}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.toLowerCase().replace(/\s/g, "") }} // Basic color code, might need mapping for specific shades
                    title={color}
                  />
                ))}
              </div>
              <span className="selected-color-name">{selectedColor}</span>
            </div>
          )}

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

          {/* Add to Cart Button */}
          <div className="product-actions">
            <button className="add-to-cart-btn-large" onClick={handleAddToCart} disabled={!product.inStock}>
              {product.inStock ? t("addToCart") : t("outOfStock")}
            </button>
          </div>

          {/* Product Features */}
          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h3>{t("features")}</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Product Details */}
          <div className="product-details-info">
            {product.material && (
              <div className="detail-item">
                <strong>{t("material")}:</strong> {product.material}
              </div>
            )}
            {product.careInstructions && (
              <div className="detail-item">
                <strong>{t("care")}:</strong> {product.careInstructions}
              </div>
            )}
            {product.origin && (
              <div className="detail-item">
                <strong>{t("origin")}:</strong> {product.origin}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2 className="section-title">{t("relatedProducts")}</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <Modal isOpen={isSizeGuideModalOpen} onClose={() => setIsSizeGuideModalOpen(false)} title={t("sizeGuide")}>
        <SizeGuide />
      </Modal>
    </div>
  )
}

export default ProductDetails
