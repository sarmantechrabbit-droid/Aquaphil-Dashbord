import { useState } from 'react'
import { 
  Plus, ImageIcon, Eye
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import { useProducts } from '../../context/ProductContext'

export default function ProductTable() {
  const { products } = useProducts()
  const navigate = useNavigate()

  const columns = [
    { 
      key: 'colorVariants', 
      label: 'Img', 
      render: (variants) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
          {variants && variants.length > 0 && variants[0].images?.length > 0 ? (
            <img src={variants[0].images[0]} alt="Thumbnail" className="w-full h-full object-cover" />
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
    { key: 'mrp', label: 'MRP', render: v => <span className="line-through text-gray-400">₹{(v || 0).toLocaleString()}</span> },
    { key: 'price', label: 'Price', render: v => <span className="font-semibold text-green-700">₹{(v || 0).toLocaleString()}</span> },
    { key: 'stock', label: 'Stock', render: v => <span className={`font-semibold ${(v || 0) === 0 ? 'text-red-600' : 'text-gray-800'}`}>{v || 0}</span> },
    { key: 'sold', label: 'Sold', render: v => <span>{v || 0}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <button 
          onClick={() => navigate(`/products/view/${row.id}`)} 
          className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline uppercase tracking-tighter"
        >
          <Eye size={12} />
          View Detail
        </button>
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
    </>
  )
}
