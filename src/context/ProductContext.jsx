import { createContext, useContext, useState } from 'react'
import { products as initialProducts } from '../data/dummyData'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts)

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `PROD${String(products.length + 1).padStart(3, '0')}`,
      sold: 0,
    }
    setProducts(prev => [productWithId, ...prev])
  }

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
