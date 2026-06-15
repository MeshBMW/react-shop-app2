import { useEffect, useState } from "react";
import api from '../api';
import { Product } from './Product'
import {useSearchParams} from "react-router";

export function ProductsGrid({ loadCart }) {
  const [products, setProducts] = useState([]);

  const [ searchParams ] = useSearchParams();
  const search = searchParams.get('search')

  useEffect(() => {
    let ignoreResponse = false;

    const getHomeData = async () => {
      const normalizedSearch = search?.trim();
      const urlPath = normalizedSearch
          ? `/api/products?search=${encodeURIComponent(normalizedSearch)}`
          : '/api/products';
      const response = await api.get(urlPath);

      if (!ignoreResponse) {
        setProducts(response.data);
      }
    }

    getHomeData();

    return () => {
      ignoreResponse = true;
    }
  }, [search]);

  return (
      <>
        {products.length === 0 && <div className="loading-spinner"><img src="/loading-spinner.svg" alt=""/></div>}
        <div className="products-grid">
          {products.map((product) => {
            return (
               <Product key={product.id} product={product} loadCart={loadCart} />
            )
          })}
        </div>
      </>
  )
}
