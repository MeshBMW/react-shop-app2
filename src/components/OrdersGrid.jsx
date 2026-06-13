import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";
import axios from "axios";

export function OrdersGrid({ orders, loadCart }) {
  return (
      <div className="orders-grid">
        {orders.map((order) => {
          return (
            <div key={order.id} className="order-container">

              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>${((order.totalCostCents) * 0.01).toFixed(2)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {order.products.map((orderProduct) => {
                  async function addProduct() {
                    await axios.post('/api/cart-items', {
                      productId: orderProduct.product.id,
                      quantity: 1
                    })
                    loadCart();
                  }

                  return (
                    <Fragment key={orderProduct.product.id}>

                      <div className="product-image-container">
                        <img src={orderProduct.product.image} alt={orderProduct.product.name}/>
                      </div>

                      <div className="product-details">
                        <div className="product-name">
                          {orderProduct.product.name}
                        </div>
                        <div className="product-delivery-date">
                          Arriving on: {dayjs(order.estimatedDeliveryTimeMs).format('MMMM D')}
                        </div>
                        <div className="product-quantity">
                          Quantity: {orderProduct.quantity}
                        </div>
                        <button className="buy-again-button button-primary" onClick={addProduct}>
                          <img className="buy-again-icon" alt="" src="images/icons/buy-again.png"/>
                          <span className="buy-again-message">Add to Cart</span>
                        </button>
                      </div>

                      <div className="product-actions">
                        <Link to="/tracking">
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </Link>
                      </div>

                    </Fragment>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
  )
}
