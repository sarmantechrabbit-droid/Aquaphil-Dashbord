import { useState } from 'react'
import { Eye, Plus } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import ServiceForm from './ServiceForm'
import AssignTechnicianForm from './AssignTechnicianForm'

export default function ServiceRequestTable({ data: initialData, title }) {
  const [data, setData] = useState(initialData)
  const [selected, setSelected] = useState(null)
  const [assigningTo, setAssigningTo] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  const handleAddSubmit = (newReq) => {
    const reqWithId = {
      ...newReq,
      id: `SRV${String(data.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      agent: ''
    }
    setData([reqWithId, ...data])
    setShowAdd(false)
  }

  const handleAssignSubmit = (agentName) => {
    setData(prev => prev.map(item => 
      item.id === assigningTo.id 
        ? { ...item, agent: agentName, status: 'Assigned' } 
        : item
    ))
    setAssigningTo(null)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'type', label: 'Type', render: v => <span className={`font-medium ${v === 'amc' ? 'text-blue-600' : 'text-emerald-600'}`}>{v === 'amc' ? 'AMC' : 'Paid'}</span> },
    { key: 'issue', label: 'Issue' },
    { key: 'city', label: 'City' },
    { key: 'date', label: 'Date' },
    { key: 'priority', label: 'Priority', render: v => <StatusBadge status={v} /> },
    { key: 'agent', label: 'Agent', render: v => v || <span className="text-gray-400 text-xs italic">Unassigned</span> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <div className="flex items-center gap-2">
          {!row.agent && (
            <button 
              onClick={() => setAssigningTo(row)}
              className="text-[10px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
            >
              Assign
            </button>
          )}
          <button onClick={() => setSelected(row)} className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" style={{ color: 'var(--primary)' }}>
            <Eye size={13} /> View
          </button>
        </div>
      )
    }
  ]

  return (
    <>
      <Table 
        title={title} 
        data={data} 
        columns={columns} 
        searchKey="customer" 
        actions={
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: 'var(--primary)' }}>
            <Plus size={13} /> Create Request
          </button>
        }
      />
      
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Service Request Details" width="max-w-2xl">
        {selected && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
               <div>
                  <h3 className="text-lg font-bold text-gray-800">{selected.issue}</h3>
                  <p className="text-xs text-gray-500 mt-1">Requested on {selected.createdAt}</p>
               </div>
               <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={selected.status} />
                  <StatusBadge status={selected.priority} />
               </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
               {/* Customer Details */}
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">{selected.customer}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{selected.customerId}</p>
                  <p className="text-sm text-gray-600 mt-1">{selected.city}</p>
               </div>

               {/* Agent Details */}
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Assigned Technician</p>
                  {selected.agent ? (
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                           {selected.agent.charAt(0)}
                        </div>
                        <p className="font-medium text-gray-800">{selected.agent}</p>
                     </div>
                  ) : (
                     <span className="text-sm text-gray-400 italic">Not assigned yet</span>
                  )}
               </div>

               {/* Service Info */}
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Service Type</p>
                  <p className="font-medium text-gray-800 capitalize">{selected.type === 'amc' ? 'AMC Service' : 'Paid Service'}</p>
               </div>

               {/* Schedule Info */}
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Scheduled Date</p>
                  <p className="font-medium text-gray-800">{selected.scheduledDate || 'Not scheduled'}</p>
               </div>
            </div>

            {/* Status Action Bar */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {['Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled'].map(s => {
                  const isActive = selected.status.toLowerCase() === s.toLowerCase().replace(' ', '_');
                  // Helper to match status strings from dummy data which are lowercase/snake_case
                  const statusValue = s.toLowerCase().replace(' ', '_');
                  
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        // Optimistic update
                        setData(prev => prev.map(item => item.id === selected.id ? { ...item, status: statusValue } : item))
                        setSelected(prev => ({ ...prev, status: statusValue }))
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selected.status === statusValue || selected.status === s.toLowerCase()
                          ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="New Service Request">
        <ServiceForm onSubmit={handleAddSubmit} />
      </Modal>

      <Modal isOpen={!!assigningTo} onClose={() => setAssigningTo(null)} title="Assign Technician">
        {assigningTo && (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg border text-sm" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-gray-500 text-xs">Service Request</p>
              <p className="font-semibold">{assigningTo.customer} - {assigningTo.type}</p>
              <p className="text-xs text-gray-400 mt-1">{assigningTo.issue}</p>
            </div>
            <AssignTechnicianForm onSubmit={handleAssignSubmit} />
          </div>
        )}
      </Modal>
    </>
  )
}
