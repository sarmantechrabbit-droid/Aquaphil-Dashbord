import { useState } from 'react'
import { Plus, Send, Edit2, Trash2, ImageIcon } from 'lucide-react'
import DeleteModal from '../common/DeleteModal'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { useData } from '../../context/DataContext'
import { CouponForm, BannerForm, BlogForm, NotificationForm } from './ConfigForms'

export function NotificationTable() {
  const { notifications, deleteNotification, addNotification } = useData()
  const [showAdd, setShowAdd] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)

  const handleAdd = (item) => {
    addNotification({ ...item, id: `NTF${notifications.length + 1}`, date: new Date().toISOString().split('T')[0], reach: '0' })
    setShowAdd(false)
  }

  const handleDelete = () => {
    deleteNotification(isDeleting)
    setIsDeleting(null)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title', render: v => <span className="font-semibold text-gray-800">{v || '—'}</span> },
    { key: 'target', label: 'Target' },
    { key: 'reach', label: 'Reach' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors" title="Edit">
            <Edit2 size={16} />
          </button>
          <button onClick={() => setIsDeleting(row.id)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]
  return (
    <>
      <Table title="Notifications" data={notifications} columns={columns} searchKey="title"
        actions={<button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}><Send size={13} /> Create Notification</button>} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Notification">
        <NotificationForm onSubmit={handleAdd} />
      </Modal>

      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Notification"
      />
    </>
  )
}

export function BannerTable() {
  const { banners, addBanner, deleteBanner } = useData()
  const [showAdd, setShowAdd] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)

  const handleAdd = (item) => {
    addBanner({ ...item, id: `BNR${banners.length + 1}` })
    setShowAdd(false)
  }

  const handleDelete = () => {
    deleteBanner(isDeleting)
    setIsDeleting(null)
  }

  const columns = [
    { 
      key: 'image', 
      label: 'Image', 
      render: v => (
        <div className="w-20 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
          {v ? (
            <img src={v} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={16} className="text-gray-300" />
          )}
        </div>
      )
    },
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title', render: v => <span className="font-semibold text-gray-800">{v || '—'}</span> },
    { key: 'position', label: 'Position' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors" title="Edit">
            <Edit2 size={16} />
          </button>
          <button onClick={() => setIsDeleting(row.id)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]
  return (
    <>
      <Table title="Banners" data={banners} columns={columns} searchKey="title"
        actions={<button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}><Plus size={13} /> Add Banner</button>} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Banner">
        <BannerForm onSubmit={handleAdd} />
      </Modal>

      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Banner"
      />
    </>
  )
}

export function BlogTable() {
  const { blogs, addBlog, deleteBlog } = useData()
  const [showAdd, setShowAdd] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)

  const handleAdd = (item) => {
    addBlog({ ...item, id: `BLG${blogs.length + 1}`, views: '0', date: new Date().toISOString().split('T')[0] })
    setShowAdd(false)
  }

  const handleDelete = () => {
    deleteBlog(isDeleting)
    setIsDeleting(null)
  }

  const columns = [
    { 
      key: 'image', 
      label: 'Thumb', 
      render: v => (
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
          {v ? (
            <img src={v} alt="Blog" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={16} className="text-gray-300" />
          )}
        </div>
      )
    },
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title', render: v => <span className="font-semibold text-gray-800">{v || '—'}</span> },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'views', label: 'Views' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors" title="Edit">
            <Edit2 size={16} />
          </button>
          <button onClick={() => setIsDeleting(row.id)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]
  return (
    <>
      <Table title="Blogs" data={blogs} columns={columns} searchKey="title"
        actions={<button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}><Plus size={13} /> Write Blog</button>} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Write Blog Post">
        <BlogForm onSubmit={handleAdd} />
      </Modal>

      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Blog Post"
      />
    </>
  )
}

export function InquiryTable() {
  const { inquiries, deleteInquiry } = useData()
  const [isDeleting, setIsDeleting] = useState(null)

  const handleDelete = () => {
    deleteInquiry(isDeleting)
    setIsDeleting(null)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject', render: v => <span className="font-medium text-gray-800">{v || '—'}</span> },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setIsDeleting(row.id)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]
  return (
    <>
      <Table title="Inquiries" data={inquiries} columns={columns} searchKey="name" />
      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Inquiry"
      />
    </>
  )
}

export default function CouponTable() {
  const { coupons, addCoupon, deleteCoupon } = useData()
  const [showAdd, setShowAdd] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)

  const handleAdd = (item) => {
    addCoupon({ ...item, id: `CPN${coupons.length + 1}`, uses: 0 })
    setShowAdd(false)
  }

  const handleDelete = () => {
    deleteCoupon(isDeleting)
    setIsDeleting(null)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Code', render: v => v ? <code className="font-bold text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">{v}</code> : '—' },
    { key: 'type', label: 'Type' },
    { key: 'value', label: 'Value', render: (v, row) => row.type === 'Percentage' ? `${v || 0}%` : `₹${(v || 0).toLocaleString()}` },
    { key: 'minOrder', label: 'Min Order', render: v => `₹${(v || 0).toLocaleString()}` },
    { key: 'uses', label: 'Used' },
    { key: 'maxUses', label: 'Max' },
    { key: 'expiry', label: 'Expiry' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors" title="Edit">
            <Edit2 size={16} />
          </button>
          <button onClick={() => setIsDeleting(row.id)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]
  return (
    <>
      <Table 
        title="Coupons" 
        data={coupons} 
        columns={columns} 
        searchKey="code"
        actions={
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}>
            <Plus size={13} /> Create Coupon
          </button>
        } 
      />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create Coupon">
        <CouponForm onSubmit={handleAdd} />
      </Modal>

      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Coupon"
      />
    </>
  )
}
