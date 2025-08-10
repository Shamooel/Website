import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./context/LanguageContext"
import { ThemeProvider } from "./context/ThemeContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Welcome from "./pages/Welcome"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Category from "./pages/Category"
import ProductDetails from "./pages/ProductDetails"
import Wishlist from "./pages/Wishlist"
import Cart from "./pages/Cart"
import SearchResults from "./pages/SearchResults"
import NotFound from "./pages/NotFound"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ShippingInfo from "./pages/ShippingInfo"
import Returns from "./pages/Returns"
import Checkout from "./pages/Checkout" // Re-added import
import SizeGuide from "./pages/SizeGuide" // Re-added import
import About from "./pages/About" // Re-added import
import Careers from "./pages/Careers" // Re-added import
import PrivacyPolicy from "./pages/PrivacyPolicy" // Re-added import
import TermsOfService from "./pages/TermsOfService" // Re-added import
import "./styles/global.css"
import "./styles/theme.css"
import "./styles/info-page.css" // Ensure this is imported for info pages

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route
                    path="/home"
                    element={
                      <>
                        <Navbar />
                        <Home />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <>
                        <Navbar />
                        <Products />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/category/:categoryName"
                    element={
                      <>
                        <Navbar />
                        <Category />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <>
                        <Navbar />
                        <ProductDetails />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <>
                        <Navbar />
                        <Wishlist />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <>
                        <Navbar />
                        <Cart />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <>
                        <Navbar />
                        <SearchResults />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <>
                        <Navbar />
                        <Contact />
                        <Footer />
                      </>
                    }
                  />
                  {/* Login and Signup pages with Navbar and Footer for consistency */}
                  <Route
                    path="/login"
                    element={
                      <>
                        <Navbar />
                        <Login />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <>
                        <Navbar />
                        <Signup />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/shipping-info"
                    element={
                      <>
                        <Navbar />
                        <ShippingInfo />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/returns"
                    element={
                      <>
                        <Navbar />
                        <Returns />
                        <Footer />
                      </>
                    }
                  />
                  {/* Checkout page */}
                  <Route
                    path="/checkout"
                    element={
                      <>
                        <Navbar />
                        <Checkout />
                        <Footer />
                      </>
                    }
                  />
                  {/* Size Guide page */}
                  <Route
                    path="/size-guide"
                    element={
                      <>
                        <Navbar />
                        <SizeGuide />
                        <Footer />
                      </>
                    }
                  />
                  {/* Footer link pages */}
                  <Route
                    path="/about"
                    element={
                      <>
                        <Navbar />
                        <About />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/careers"
                    element={
                      <>
                        <Navbar />
                        <Careers />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/privacy-policy"
                    element={
                      <>
                        <Navbar />
                        <PrivacyPolicy />
                        <Footer />
                      </>
                    }
                  />
                  <Route
                    path="/terms-of-service"
                    element={
                      <>
                        <Navbar />
                        <TermsOfService />
                        <Footer />
                      </>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
