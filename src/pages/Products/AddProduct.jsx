import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import AddProductForm from '../../components/Products/AddProductForm'
import { useProducts } from '../../context/ProductContext'

export default function AddProduct() {
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  const handleCreate = (newProduct) => {
    addProduct(newProduct)
    navigate('/products/list')
  }

  return (
    <motion.div 
       initial={{ opacity: 0, y: 10 }} 
       animate={{ opacity: 1, y: 0 }} 
       transition={{ duration: 0.3 }}
       className=" mx-auto"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/products/list')}
          className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
           <p className="text-sm text-gray-500">Set up a new product for your store</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <AddProductForm onSubmit={handleCreate} />
      </div>
    </motion.div>
  )
}
