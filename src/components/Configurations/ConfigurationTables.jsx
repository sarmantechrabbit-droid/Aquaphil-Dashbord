import { useState } from 'react'
import { Plus, Send } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { coupons as initialCoupons, notifications as initialNotifications, banners as initialBanners, blogs as initialBlogs, inquiries } from '../../data/dummyData'
import { CouponForm, BannerForm, BlogForm, NotificationForm } from './ConfigForms'

export function NotificationTable() {
  const [data, setData] = useState(initialNotifications)
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (item) => {
    setData([{ ...item, id: `NTF${data.length + 1}`, date: new Date().toISOString().split('T')[0], reach: '0' }, ...data])
    setShowAdd(false)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title', render: v => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'target', label: 'Target' },
    { key: 'reach', label: 'Reach' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]
  return (
    <>
      <Table title="Notifications" data={data} columns={columns} searchKey="title"
        actions={<button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}><Send size={13} /> Create Notification</button>} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Notification">
        <NotificationForm onSubmit={handleAdd} />
      </Modal>
    </>
  )
}

export function BannerTable() {
  const [data, setData] = useState(initialBanners)
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (item) => {
    setData([{ ...item, id: `BNR${data.length + 1}` }, ...data])
    setShowAdd(false)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title', render: v => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'position', label: 'Position' },
    { key: 'startDate', label: 'Start' },
    { key: 'endDate', label: 'End' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]
  return (
    <>
      <Table title="Banners" data={data} columns={columns} searchKey="title"
        actions={<button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}><Plus size={13} /> Add Banner</button>} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Banner">
        <BannerForm onSubmit={handleAdd} />
      </Modal>
    </>
  )
}

export function BlogTable() {
  const [data, setData] = useState(initialBlogs)
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (item) => {
    setData([{ ...item, id: `BLG${data.length + 1}`, views: '0', date: new Date().toISOString().split('T')[0] }, ...data])
    setShowAdd(false)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title', render: v => <span className="font-semibold text-gray-800">{v}</span> },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category' },
    { key: 'views', label: 'Views' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]
  return (
    <>
      <Table title="Blogs" data={data} columns={columns} searchKey="title"
        actions={<button onClick={() => setShowAdd(true)} className="flex items-center gap-2 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm" style={{ background: 'var(--primary)' }}><Plus size={13} /> Write Blog</button>} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Write Blog Post">
        <BlogForm onSubmit={handleAdd} />
      </Modal>
    </>
  )
}

export function InquiryTable() {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'subject', label: 'Subject', render: v => <span className="font-medium text-gray-800">{v}</span> },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]
  return (
    <Table title="Inquiries" data={inquiries} columns={columns} searchKey="name" />
  )
}

export default function CouponTable() {
  const [data, setData] = useState(initialCoupons)
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = (item) => {
    setData([{ ...item, id: `CPN${data.length + 1}`, uses: 0 }, ...data])
    setShowAdd(false)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Code', render: v => <code className="font-bold text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">{v}</code> },
    { key: 'type', label: 'Type' },
    { key: 'value', label: 'Value', render: (v, row) => row.type === 'Percentage' ? `${v}%` : `₹${(v || 0).toLocaleString()}` },
    { key: 'minOrder', label: 'Min Order', render: v => `₹${(v || 0).toLocaleString()}` },
    { key: 'uses', label: 'Used' },
    { key: 'maxUses', label: 'Max' },
    { key: 'expiry', label: 'Expiry' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
  ]
  return (
    <>
      <Table 
        title="Coupons" 
        data={data} 
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
    </>
  )
}
