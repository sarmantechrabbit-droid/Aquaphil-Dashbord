import { useState } from 'react'

export function CouponForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    code: '',
    type: 'Percentage',
    value: '',
    minOrder: '',
    maxUses: '',
    expiry: '',
    status: 'Active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Coupon Code</label>
        <input required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg uppercase" placeholder="SAVE50" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Type</label>
        <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
          <option>Percentage</option>
          <option>Fixed Amount</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">{formData.type === 'Percentage' ? 'Percentage (%)' : 'Amount (₹)'}</label>
        <input required type="number" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="0" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Min Order (₹)</label>
        <input required type="number" value={formData.minOrder} onChange={e => setFormData({...formData, minOrder: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="0" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Max Uses</label>
        <input required type="number" value={formData.maxUses} onChange={e => setFormData({...formData, maxUses: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="100" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry Date</label>
        <input required type="date" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
      </div>
      <div className="md:col-span-2 pt-4 flex justify-end">
        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white rounded-xl shadow-md" style={{ background: 'var(--primary)' }}>Create Coupon</button>
      </div>
    </form>
  )
}

export function BannerForm({ onSubmit }) {
  const [formData, setFormData] = useState({ title: '', position: 'Home Top', startDate: '', endDate: '', status: 'Active' })
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData) }
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1 md:col-span-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Banner Title</label>
        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Summer Sale" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Position</label>
        <select value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
          <option>Home Top</option>
          <option>Product Page</option>
          <option>Sidebar</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Start Date</label>
        <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">End Date</label>
        <input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" />
      </div>
      <div className="md:col-span-2 pt-4 flex justify-end">
        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white rounded-xl shadow-md" style={{ background: 'var(--primary)' }}>Add Banner</button>
      </div>
    </form>
  )
}

export function BlogForm({ onSubmit }) {
  const [formData, setFormData] = useState({ title: '', author: '', category: 'Maintenance', content: '', status: 'Published' })
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData) }
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Blog Title</label>
        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="How to maintain your RO" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Author</label>
          <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Admin" />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Category</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
            <option>Maintenance</option>
            <option>Product Guide</option>
            <option>Health Tips</option>
          </select>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Content Preview</label>
        <textarea required rows={3} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Write something..." />
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white rounded-xl shadow-md" style={{ background: 'var(--primary)' }}>Write Blog</button>
      </div>
    </form>
  )
}

export function NotificationForm({ onSubmit }) {
  const [formData, setFormData] = useState({ title: '', target: 'All Users', message: '', status: 'Sent' })
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData) }
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Title</label>
        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Urgent Maintenance Alert" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Target Audience</label>
        <select value={formData.target} onChange={e => setFormData({...formData, target: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg">
          <option>All Users</option>
          <option>Active AMC Users</option>
          <option>Staff Only</option>
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Message</label>
        <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="Enter notification message..." />
      </div>
      <div className="flex justify-end pt-4">
        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white rounded-xl shadow-md" style={{ background: 'var(--primary)' }}>Send Notification</button>
      </div>
    </form>
  )
}
