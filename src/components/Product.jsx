import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { formatMoney } from '../utils/money';

export function Product({ product, loadCart }) {
 const [quantity, setQuantity] = useState(1);
 const [addedText, setAddedText] = useState(false);
 const [isAdding, setIsAdding] = useState(false);
 const addedTextTimeout = useRef(null);
 const rating = product.rating || { stars: 0, count: 0 };
 const image = product.image
 const name = product.name || 'Product unavailable';

 async function addToCart () {
   if (isAdding) {
     return;
   }

   try {
     setIsAdding(true);
     setAddedText(true);
     await axios.post('/api/cart-items', {
       productId: product.id,
       quantity
     })

     await loadCart();
     clearTimeout(addedTextTimeout.current);
     addedTextTimeout.current = setTimeout(() => {
       setAddedText(false);
     }, 1200)
   } catch (e) {
     console.log(e);
     setAddedText(false);
   } finally {
     setIsAdding(false);
   }
 }

 useEffect(() => {
   return () => clearTimeout(addedTextTimeout.current);
 }, [])

 function quantitySelector(e) {
     setQuantity(Number(e.target.value))
 }
  return (
      <div key={product.id} className="product-container"
          data-testid="product-container">
        <div className="product-image-container">
          <img className="product-image"
               data-testid="product-image"
               alt={name}
               src={image}/>
        </div>

        <div className="product-name limit-text-to-2-lines"
              data-testid="product-name">
          {name}
        </div>

        <div className="product-rating-container">
          <img className="product-rating-stars"
               data-testid="product-rating-stars"
               alt={`${rating.stars} out of 5 stars`}
               src={`images/ratings/rating-${rating.stars * 10}.png`} />
          <div className="product-rating-count link-primary">
            {rating.count}
          </div>
        </div>

        <div className="product-price">
          ${formatMoney(product.priceCents || 0)}
        </div>

        <div className="product-quantity-container">
          <select value={quantity} onChange={quantitySelector}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className={`added-to-cart ${addedText ? 'is-visible' : ''}`}>
          <img alt="" src="images/icons/checkmark.png" />
          Added
        </div>

        <button
            onClick={addToCart}
            className="add-to-cart-button button-primary"
            data-testid="add-to-cart-btn"
            disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
  )
}
