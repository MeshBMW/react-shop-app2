import '../styles/pages/tracking/tracking.css'
import { Header } from "../components/Header.tsx";
import dayjs from 'dayjs'

export function TrackingPage({ cartItems = [], theme = 'light', toggleTheme = () => {} }) {
  return (
      <>
        <link rel="apple-touch-icon" sizes="180x180" href="/faviconT/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/faviconT/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/faviconT/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>

        <title>Tracking Page</title>

        <Header cart={cartItems} theme={theme} toggleTheme={toggleTheme}/>

        <div className="tracking-page">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>
          {cartItems.map(( cartItem ) => {
            return (
                <div key={cartItem.product.id} className="order-tracking">

                  <div className="delivery-date">
                    Arriving on {dayjs(cartItem.deliveryDate).format('dddd, MMMM D')}
                  </div>

                  <div className="product-info">
                    {cartItem.product.name}
                  </div>

                  <div className="product-info">
                    Quantity: {cartItem.quantity}
                  </div>

                  <img className="product-image" src={cartItem.product.image}/>

                  <div className="progress-labels-container">
                    <div className="progress-label">
                      Preparing
                    </div>
                    <div className="progress-label current-status">
                      Shipped
                    </div>
                    <div className="progress-label">
                      Delivered
                    </div>
                  </div>

                  <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                  </div>
                </div>
            )
          })}
        </div>
      </>
  )
}
