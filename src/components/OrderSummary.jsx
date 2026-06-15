import api from '../api';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import {DeliveryOptions} from "./DeliveryOptions.jsx";
import {CartItemDetails} from "./CartItemDetails.jsx";


export function OrderSummary({ cartItems, loadCart, theme }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  let classNameOfA = '';
  const isDarkTheme = theme === 'dark';
  useEffect(() => {
    const fetchOrderSMData = async () => {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/delivery-options?expand=estimatedDeliveryTime`)
      setDeliveryOptions(response.data);
    }
    fetchOrderSMData();
  }, [])

  isDarkTheme ? classNameOfA = 'white-color' : classNameOfA = 'black-color';

  if (cartItems.length === 0)
    return (
      <div>No items in cart. <a className={classNameOfA} href="/" style={{textDecoration: 'underline'}}
        >Order.</a>
      </div>
  )
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
                await api.delete(`${import.meta.env.VITE_API_URL}/api/cart-items/${cartItem.productId}`)
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

                      <CartItemDetails cartItem={cartItem} deleteCartItem={deleteCartItem} loadCart={loadCart}/>
                      <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>
                    </div>
                  </div>
              )
            })}

          </div>
        </>
    )
}
