import { useState } from "react";
import api from '../api';


export function CartItemDetails({ cartItem, deleteCartItem, loadCart }) {
  const [updatedQuantity, setUpdatedQuantity] = useState(false);
  const [qty, setQty] = useState(cartItem.quantity);

  async function updaterQty() {
    if (updatedQuantity) {
      const nextQuantity = Number(qty);

      if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
        setQty(cartItem.quantity);
        setUpdatedQuantity(false);
        return;
      }

      await api.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: nextQuantity
      })
      await loadCart();
      setUpdatedQuantity(false);
    } else {
      setUpdatedQuantity(true);
    }
  }

  return (
      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          ${((cartItem.product.priceCents || 0) / 100).toFixed(2)}
        </div>
        <div className="product-quantity">
              <span>
                Quantity: <span className="quantity-label">{cartItem.quantity}</span>
              </span>
          <span className="update-quantity-link link-primary" onClick={updaterQty}>
                Update
              </span>
          <span onClick={deleteCartItem} className="delete-quantity-link link-primary">
                Delete
              </span>
          <input
              className={`updaterQty ${updatedQuantity ? 'is-visible' : ''}`}
              type="number"
              min="1"
              value={qty}
              onKeyDown={(event) => {
                if(event.key === 'Enter') {
                  updaterQty();
                } else if (event.key === 'Escape') {
                  setQty(cartItem.quantity);
                  setUpdatedQuantity(false);
                }
              }}
              onChange={(event) => {
                setQty(event.target.value)
              }}
          />
        </div>
      </div>
  )
}
