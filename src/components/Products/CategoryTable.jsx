import { useState } from 'react'
import { Plus } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { categories as initialCategories } from '../../data/dummyData'
import CategoryForm from './CategoryForm'

export default function CategoryTable() {
  const [data, setData] = useState(initialCategories)
  const [showAdd, setShowAdd] = useState(false)

  const handleAddSubmit = (newCat) => {
    const catWithId = {
      ...newCat,
      id: `CAT${String(data.length + 1).padStart(3, '0')}`,
      products: 0,
    }
    setData([catWithId, ...data])
    setShowAdd(false)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Category Name', render: v => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'slug', label: 'Slug', render: v => <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{v}</code> },
    { key: 'description', label: 'Description' },
    { key: 'products', label: 'Products', render: v => <span className="font-bold text-blue-700">{v}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]

  return (
    <>
      <Table
        title="Product Categories"
        data={data}
        columns={columns}
        searchKey="name"
        actions={
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)' }}>
            <Plus size={13} /> Add Category
          </button>
        }
      />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Category">
        <CategoryForm onSubmit={handleAddSubmit} />
      </Modal>
    </>
  )
}
