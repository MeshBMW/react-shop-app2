import dayjs from 'dayjs'
import axios from 'axios'


export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {

  return (
      <div className="delivery-options">
        <div className="delivery-options-title">
          Choose a delivery option:
        </div>
        {deliveryOptions.map((deliveryOption) => {

          async function updateDeliveryOption() {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id
            })
            await loadCart();
          }

          return (
            <div key={deliveryOption.id} onClick={updateDeliveryOption} className="delivery-option">
              <input type="radio"
                     onChange={() => {}}
                     checked={deliveryOption.id === cartItem.deliveryOptionId}
                     className="delivery-option-input"
                     name={`delivery-option-${cartItem.product.id}`}/>
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                </div>
                <div className="delivery-option-price">
                  {deliveryOption.priceCents === 0
                      ? 'FREE Shipping'
                      : `$${(Math.round(deliveryOption.priceCents) * 0.01).toFixed(2)} - Shipping`
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
  )
}