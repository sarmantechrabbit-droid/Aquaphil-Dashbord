import { useState } from 'react'
import { RefreshCw, CheckCircle2 } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { amcSubscriptions as initialData } from '../../data/dummyData'

export default function RenewalTable() {
  // Filter for both 'active' and 'expiring_soon' for renewals
  const [data, setData] = useState(initialData.filter(a => ['active', 'expiring_soon'].includes(a.status)))
  const [selected, setSelected] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleRenew = () => {
    // In a real app, this would call an API
    setData(prev => prev.filter(a => a.id !== selected.id))
    setShowConfirm(false)
    setSelected(null)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'plan', label: 'Plan' },
    { key: 'endDate', label: 'Expiry Date', render: v => <span className="text-amber-600 font-semibold">{v}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <button 
          onClick={() => { setSelected(row); setShowConfirm(true); }}
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded text-white active:scale-95 transition-transform" style={{ background: 'var(--primary)' }}>
          <RefreshCw size={11} /> Renew
        </button>
      )
    }
  ]

  return (
    <>
      <Table 
        title="Upcoming Renewals" 
        data={data} 
        columns={columns} 
        searchKey="customer" 
      />

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Renewal">
        {selected && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex gap-3">
              <CheckCircle2 className="shrink-0" size={18} />
              <p className="text-sm">Are you sure you want to renew the <b>{selected.plan}</b> for <b>{selected.customer}</b>?</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={handleRenew}
                className="px-6 py-2 text-sm font-semibold text-white rounded-lg shadow-md" style={{ background: 'var(--primary)' }}>
                Confirm Renewal
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export function ExpiredTable() {
  const [data, setData] = useState(initialData.filter(a => a.status === 'expired'))
  const [selected, setSelected] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReactivae = () => {
    setData(prev => prev.filter(a => a.id !== selected.id))
    setShowConfirm(false)
    setSelected(null)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'plan', label: 'Plan' },
    { key: 'endDate', label: 'Expired On', render: v => <span className="text-red-600 font-semibold">{v}</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <button 
          onClick={() => { setSelected(row); setShowConfirm(true); }}
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded text-white active:scale-95 transition-transform" style={{ background: '#059669' }}>
          <RefreshCw size={11} /> Re-activate
        </button>
      )
    }
  ]

  return (
    <>
      <Table 
        title="Expired AMC" 
        data={data} 
        columns={columns} 
        searchKey="customer" 
      />

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Re-activation">
        {selected && (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg flex gap-3">
              <CheckCircle2 className="shrink-0" size={18} />
              <p className="text-sm">Are you sure you want to re-activate the <b>{selected.plan}</b> for <b>{selected.customer}</b>?</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                Cancel
              </button>
              <button 
                onClick={handleReactivae}
                className="px-6 py-2 text-sm font-semibold text-white rounded-lg shadow-md bg-emerald-600">
                Confirm Re-activate
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
