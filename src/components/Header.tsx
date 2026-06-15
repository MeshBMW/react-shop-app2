import '../styles/pages/header.css'
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { type FormEvent, useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
    cart?: {
        productId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};


export function Header({ cart = [], theme, toggleTheme }: HeaderProps) {
  const navigate = useNavigate();
  const [ searchParams ] = useSearchParams();
  const searchText = searchParams.get('search')
  const [search, setSearch] = useState(searchText || '');

  const totalQty = cart.reduce((total, cartItem) => total + cartItem.quantity, 0)

  useEffect(() => {
    setSearch(searchText || '');
  }, [searchText])

  function searchProducts(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextSearch = search.trim();
    navigate(nextSearch ? `/?search=${encodeURIComponent(nextSearch)}` : '/')
  }

  return (
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
               alt="Logo"
               src="images/Slogo.jpg"/>
            <img className="mobile-logo"
               alt="Logo"
               src="images/Slogo.jpg"/>
          </NavLink>
        </div>

        <form className="middle-section" onSubmit={searchProducts}>
          <input
              className="search-bar"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => {
                  setSearch(event.target.value)
              }}
          />

          <button type="submit" className="search-button" aria-label="Search products">
            <img className="search-icon" alt="" src="images/icons/search-icon.png"/>
          </button>
        </form>

        <div className="right-section">
          <ThemeToggle theme={theme} onToggleTheme={toggleTheme} />

          <NavLink to="/orders" className="orders-link header-link">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink to="/checkout" className="cart-link header-link">
            <img className="cart-icon" alt="" src="images/icons/cart-icon.png"/>
            <div className="cart-quantity">{totalQty}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
  )
}
