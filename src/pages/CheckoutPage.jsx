import '../styles/pages/checkout/checkout.css'
import '../styles/pages/checkout/checkout-header.css'
import { Link } from 'react-router'
import { OrderSummary} from "../components/OrderSummary";
import { PaymentSummary } from "../components/PaymentSummary.jsx";
import { ThemeToggle } from "../components/ThemeToggle.tsx";

export function CheckoutPage({ cartItems = [], loadCart, theme = 'light', toggleTheme = () => {} }) {
  const totalQty = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
      <>
        <link rel="apple-touch-icon" sizes="180x180" href="/faviconS/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/faviconS/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/faviconS/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <title>Checkout</title>

        <div className="checkout-header">
          <div className="header-content">
            <div className="checkout-header-left-section">
              <Link to="/">
                <img className="logo" alt="Shop logo" src="images/Slogo.jpg"/>
                <img className="mobile-logo" alt="Shop logo" src="images/Slogo.jpg"/>
              </Link>
            </div>

            <div className="checkout-header-middle-section">
              Checkout (<Link to="/" className="return-to-home-link">
              { totalQty } items
            </Link>)
            </div>

            <div className="checkout-header-right-section">
              <ThemeToggle theme={theme} onToggleTheme={toggleTheme} className="checkout-theme-toggle" />
              <img alt="" src="images/icons/checkout-lock-icon.png"/>
            </div>
          </div>
        </div>
        <div className="checkout-page">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <OrderSummary cartItems={cartItems} loadCart={loadCart} theme={theme} />
            <PaymentSummary cartItems={cartItems} loadCart={loadCart} />
          </div>
        </div>
      </>
  )
}
