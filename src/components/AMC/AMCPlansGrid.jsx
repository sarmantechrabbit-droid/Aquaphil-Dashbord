import { useState } from 'react'
import { motion } from 'framer-motion'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { amcPlans as initialPlans } from '../../data/dummyData'
import { Shield, Plus, Check } from 'lucide-react'
import AMCPlanForm from './AMCPlanForm'

const colors = ['var(--primary)', '#0891b2', '#7c3aed', '#d97706']

export default function AMCPlansGrid() {
  const [plans, setPlans] = useState(initialPlans)
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleAddSubmit = (newPlan) => {
    const planWithId = {
      ...newPlan,
      id: `AMC${String(plans.length + 1).padStart(3, '0')}`
    }
    setPlans([planWithId, ...plans])
    setShowAdd(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-gray-700">AMC Plans</h2>
        <button 
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-all active:scale-95"
          style={{ background: 'var(--primary)' }}>
          <Plus size={13} /> Create Plan
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border overflow-hidden cursor-pointer group"
            style={{ borderColor: 'var(--border-color)' }}
            onClick={() => setSelected(plan)}
          >
            <div className="p-5 text-white relative transition-colors" style={{ background: colors[i % colors.length] }}>
              <Shield size={22} className="mb-3 opacity-80" />
              <h3 className="font-display font-bold text-lg group-hover:underline">{plan.name}</h3>
              <p className="text-sm opacity-80">{plan.duration}</p>
              <p className="text-3xl font-display font-black mt-2">₹{(plan.price || 0).toLocaleString()}</p>
            </div>
            <div className="p-5 space-y-2">
              {[
                `${plan.services} Service Visits`,
                `${plan.filters} Filter Replacement${plan.filters > 1 ? 's' : ''}`,
                'Priority Support',
                'Genuine Spare Parts',
              ].map((f, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: `${colors[i % colors.length]}20` }}>
                    <Check size={10} style={{ color: colors[i % colors.length] }} />
                  </div>
                  <span className="text-xs text-gray-600">{f}</span>
                </div>
              ))}
              <div className="pt-3">
                <StatusBadge status={plan.status} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Plan Details">
        {selected && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Plan Name</p>
                <p className="text-sm font-semibold">{selected.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Price</p>
                <p className="text-sm font-semibold text-primary">₹{(selected.price || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Duration</p>
                <p className="text-sm font-medium">{selected.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Current Status</p>
                <StatusBadge status={selected.status} />
              </div>
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Change Status</label>
              <div className="flex gap-2">
                {['active', 'inactive'].map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      setPlans(prev => prev.map(p => p.id === selected.id ? { ...p, status: s } : p))
                      setSelected(prev => ({ ...prev, status: s }))
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      selected.status === s 
                        ? 'bg-primary text-white shadow-md scale-105' 
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Create New AMC Plan">
        <AMCPlanForm onSubmit={handleAddSubmit} />
      </Modal>
    </div>
  )
}
