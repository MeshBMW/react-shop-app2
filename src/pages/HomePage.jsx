import '../styles/pages/home/home-page.css'
import { Header } from "../components/Header.tsx";
import { ProductsGrid } from "../components/ProductsGrid.jsx";


export function HomePage({ cartItems, loadCart, theme = 'light', toggleTheme = () => {} }) {

    return (
        <>
          <link rel="apple-touch-icon" sizes="180x180" href="/faviconH/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/faviconH/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/faviconH/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>

          <title>Home Page</title>

          <Header cart={cartItems} theme={theme} toggleTheme={toggleTheme} />

          <div className="home-page">
            <ProductsGrid loadCart={loadCart} />
          </div>

        </>
    )
}
