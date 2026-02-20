import { useState } from 'react'
import { motion } from 'framer-motion'
import Table from '../common/Table'
import Card from '../common/Card'
import StatusBadge from '../common/StatusBadge'
import StatusSelect from '../common/StatusSelect'
import Modal from '../common/Modal'
import { staff as initialStaff, roles as initialRoles } from '../../data/dummyData'
import { UserPlus, Shield, Plus, Edit2, Trash2 } from 'lucide-react'
import StaffForm from './StaffForm'

export function RoleForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: '', color: '#4230ac', permissions: [] })
  const perms = ['customers', 'products', 'orders', 'services', 'amc', 'reports', 'settings']
  
  const togglePerm = (p) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(p) 
        ? prev.permissions.filter(x => x !== p)
        : [...prev.permissions, p]
    }))
  }

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(formData) }} className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Role Name</label>
        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="e.g. Service Manager" />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Permissions</label>
        <div className="flex flex-wrap gap-2">
          {perms.map(p => (
            <button 
              key={p} 
              type="button"
              onClick={() => togglePerm(p)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${formData.permissions.includes(p) ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-gray-600 border-gray-200'}`}
              style={formData.permissions.includes(p) ? { background: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white rounded-xl shadow-md" style={{ background: 'var(--primary)' }}>Create Role</button>
      </div>
    </form>
  )
}

export default function StaffAndRoles() {
  const [staffData, setStaffData] = useState(initialStaff)
  const [rolesData, setRolesData] = useState(initialRoles)
  const [editingStaff, setEditingStaff] = useState(null)
  const [editingRole, setEditingRole] = useState(null) // Added for future role editing if needed
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [showAddRole, setShowAddRole] = useState(false)

  const handleAddStaff = (member) => {
    setStaffData([{ ...member, id: `STF${staffData.length + 1}`, joinDate: new Date().toISOString().split('T')[0] }, ...staffData])
    setShowAddStaff(false)
  }

  const handleEditStaff = (updatedData) => {
    setStaffData(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...updatedData } : s))
    setEditingStaff(null)
  }

  const handleDeleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffData(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setStaffData(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s))
  }

  const handleAddRole = (role) => {
    setRolesData([{ ...role, id: `ROLE${rolesData.length + 1}`, members: 0 }, ...rolesData])
    setShowAddRole(false)
  }

  const staffColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'role', label: 'Role', render: v => <span className="font-semibold text-blue-700">{v}</span> },
    { key: 'department', label: 'Department' },
    { key: 'joinDate', label: 'Joined' },
    { 
      key: 'status', 
      label: 'Status', 
      render: (v, row) => (
        <StatusSelect 
          status={v} 
          options={['Active', 'Inactive', 'On Leave']} 
          onChange={(newStatus) => handleStatusChange(row.id, newStatus)} 
        />
      ) 
    },
    {
      key: 'id', label: 'Action', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setEditingStaff(row)} 
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors"
            title="Edit Staff"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDeleteStaff(row.id)} 
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
            title="Delete Staff"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-8">
      {/* Staff Section */}
      <section className="space-y-4">
        <Table
          title="Staff Directory"
          data={staffData}
          columns={staffColumns}
          searchKey="name"
          actions={
            <button 
              onClick={() => setShowAddStaff(true)}
              className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90"
              style={{ background: 'var(--primary)' }}>
              <UserPlus size={13} /> Add Staff
            </button>
          }
        />
      </section>

      {/* Roles Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-gray-700">Roles & Permissions</h2>
          <button 
            onClick={() => setShowAddRole(true)}
            className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90"
            style={{ background: 'var(--primary)' }}>
            <Plus size={13} /> Create Role
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rolesData.map(role => (
            <Card key={role.id} hover>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${role.color || '#4230ac'}18` }}>
                  <Shield size={18} style={{ color: role.color || '#4230ac' }} />
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: role.color || '#4230ac' }}>
                  {role.members} member{role.members !== 1 ? 's' : ''}
                </span>
              </div>
              <h3 className="font-display font-bold text-gray-800 mb-2">{role.name}</h3>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map(p => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium capitalize">{p}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Modal isOpen={showAddStaff} onClose={() => setShowAddStaff(false)} title="Add Staff Member">
        <StaffForm onSubmit={handleAddStaff} />
      </Modal>

      <Modal isOpen={!!editingStaff} onClose={() => setEditingStaff(null)} title="Edit Staff Member">
        {editingStaff && (
          <StaffForm initialData={editingStaff} onSubmit={handleEditStaff} />
        )}
      </Modal>

      <Modal isOpen={showAddRole} onClose={() => setShowAddRole(false)} title="Create New Role">
        <RoleForm onSubmit={handleAddRole} />
      </Modal>
    </div>
  )
}
