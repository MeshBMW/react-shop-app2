import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import {DeliveryOptions} from "./DeliveryOptions.jsx";
import {CartItemDetails} from "./CartItemDetails.jsx";


export function OrderSummary({ cartItems, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchOrderSMData = async () => {
      const response = await axios.get('api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data);
    }
    fetchOrderSMData();
  }, [])

  return (
      <>
        <div className="order-summary">
          {deliveryOptions.length > 0 && cartItems.map((cartItem) => {

            const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId
            })
            const deliveryDate = selectedDeliveryOption
                ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
                : 'Delivery option unavailable';

            async function deleteCartItem() {
              await axios.delete(`/api/cart-items/${cartItem.productId}`)
              await loadCart();
            }

            return (
                <div key={cartItem.id} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {deliveryDate}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image" alt={cartItem.product.name}
                         src={cartItem.product.image}
                    />

                    <CartItemDetails cartItem={cartItem} deleteCartItem={deleteCartItem} loadCart={loadCart} />
                    <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
                  </div>
                </div>
            )
          })}

          </div>
      </>
  )
}
