import { it, vi, describe, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Product } from "../components/Product";
import { userEvent } from '@testing-library/user-event'
import axios from 'axios'

let product
let loadCart
vi.mock('axios')

describe('Product component',
    () => {
    beforeEach(() => {
      product = {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"]
      }
      loadCart = vi.fn()
      axios.post.mockResolvedValue({ data: {} })
      loadCart.mockResolvedValue()
    })
      it('checks product details', () => {
      render(<Product product={product} loadCart={loadCart} />)
      expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument()
      expect(screen.getByText('$10.90')).toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')
      expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src', `images/ratings/rating-45.png`)
      expect(screen.getByText('87')).toBeInTheDocument()
    })
        it('checks Add to Cart BTN', async () => {
          render(<Product product={product} loadCart={loadCart} />)
          const user = userEvent.setup()
          const addToCartBTN = screen.getByTestId('add-to-cart-btn')
          await user.click(addToCartBTN)

          await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
              productId: product.id,
              quantity: 1,
            })
            expect(loadCart).toHaveBeenCalled()
          })
        })
})

