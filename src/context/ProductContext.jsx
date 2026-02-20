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
      createdAt: new Date().toISOString()
    }
    setProducts(prev => [productWithId, ...prev])
  }

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
