import { useState } from 'react'
import { Eye } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { supportTickets } from '../../data/dummyData'

export default function SupportTicketTable() {
  const [selected, setSelected] = useState(null)

  const columns = [
    { key: 'id', label: 'Ticket ID', render: v => <span className="font-mono text-xs font-semibold text-purple-700">{v}</span> },
    { key: 'customer', label: 'Customer' },
    { key: 'subject', label: 'Subject', render: v => <span className="font-medium text-gray-800">{v}</span> },
    { key: 'category', label: 'Category' },
    { key: 'priority', label: 'Priority', render: v => <StatusBadge status={v} /> },
    { key: 'agent', label: 'Agent', render: v => v || <span className="text-gray-400 text-xs italic">Unassigned</span> },
    { key: 'date', label: 'Opened' },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    {
      key: 'id', label: '', render: (_, row) => (
        <button onClick={() => setSelected(row)} className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors" style={{ color: 'var(--primary)' }}>
          <Eye size={13} /> View
        </button>
      )
    }
  ]

  return (
    <>
      <Table title="Support Tickets" data={supportTickets} columns={columns} searchKey="subject" />
      
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Ticket Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(selected).map(([k, v]) => (
                <div key={k} className={k === 'subject' ? 'col-span-2' : ''}>
                  <p className="text-xs text-gray-400 capitalize mb-1">{k.replace(/([A-Z])/g, ' $1')}</p>
                  {['status', 'priority'].includes(k) ? <StatusBadge status={v} /> :
                    <p className="text-sm font-medium text-gray-800">{v || '—'}</p>}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-2">Update Status</label>
                <div className="flex flex-wrap gap-2">
                  {['open', 'in_progress', 'resolved', 'closed'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelected(prev => ({ ...prev, status: s }))}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                        selected.status === s 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-2">Update Priority</label>
                <div className="flex flex-wrap gap-2">
                  {['low', 'medium', 'high'].map(p => (
                    <button
                      key={p}
                      onClick={() => setSelected(prev => ({ ...prev, priority: p }))}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                        selected.priority === p 
                          ? 'bg-primary text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-xs text-gray-400 mb-2 font-semibold">Reply</p>
              <textarea
                rows={3}
                placeholder="Type your reply..."
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-1 resize-none bg-gray-50"
                style={{ borderColor: 'var(--border-color)' }}
              />
              <div className="flex justify-end mt-3">
                <button className="px-5 py-2 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-md"
                  style={{ background: 'var(--primary)' }}>
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
