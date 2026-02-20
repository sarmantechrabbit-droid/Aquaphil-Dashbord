import { useState } from 'react'
import { 
  Plus, ImageIcon, Eye, Edit2, Trash2
} from 'lucide-react'
import DeleteModal from '../common/DeleteModal'
import { useNavigate } from 'react-router-dom'
import Table from '../common/Table'
import StatusSelect from '../common/StatusSelect'
import Modal from '../common/Modal'
import ProductForm from './ProductForm'
import { useProducts } from '../../context/ProductContext'

export default function ProductTable() {
  const { products, deleteProduct, updateProduct } = useProducts()
  const navigate = useNavigate()
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDeleting, setIsDeleting] = useState(null)

  const handleDelete = () => {
    deleteProduct(isDeleting)
    setIsDeleting(null)
  }

  const handleEditSubmit = (updatedData) => {
    updateProduct(editingProduct.id, updatedData)
    setEditingProduct(null)
  }

  const handleStatusChange = (id, newStatus) => {
    updateProduct(id, { status: newStatus })
  }

  const columns = [
    { 
      key: 'colorVariants', 
      label: 'Img', 
      render: (variants) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
          {variants && variants.length > 0 && variants[0].mainImage ? (
            <img src={variants[0].mainImage} alt="Thumbnail" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={16} className="text-gray-300" />
          )}
        </div>
      )
    },
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product Name', render: v => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'sku', label: 'SKU', render: v => <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{v}</code> },
    { key: 'category', label: 'Category' },
    { key: 'mrp', label: 'MRP', render: v => v != null ? <span className="line-through text-gray-400">₹{v.toLocaleString()}</span> : '—' },
    { key: 'price', label: 'Price', render: v => v != null ? <span className="font-semibold text-green-700">₹{v.toLocaleString()}</span> : '—' },
    { key: 'stock', label: 'Stock', render: v => v != null ? <span className={`font-semibold ${v === 0 ? 'text-red-600' : 'text-gray-800'}`}>{v}</span> : '—' },
    { key: 'sold', label: 'Sold', render: v => v != null ? <span>{v}</span> : '—' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (v, row) => (
        <StatusSelect 
          status={v} 
          options={['active', 'out_of_stock', 'archived']} 
          onChange={(newStatus) => handleStatusChange(row.id, newStatus)} 
        />
      ) 
    },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(`/products/view/${row.id}`)} 
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={() => setEditingProduct(row)} 
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors"
            title="Edit Product"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => setIsDeleting(row.id)} 
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
            title="Delete Product"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      <Table
        title="Product List"
        data={products}
        columns={columns}
        searchKey="name"
        actions={
          <button 
            onClick={() => navigate('/products/add')}
            className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)' }}>
            <Plus size={13} /> Add Product
          </button>
        }
      />
      <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)} title="Edit Product" width="max-w-4xl">
        {editingProduct && (
          <ProductForm initialData={editingProduct} onSubmit={handleEditSubmit} />
        )}
      </Modal>

      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  )
}
