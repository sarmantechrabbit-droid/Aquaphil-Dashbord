import { useState } from 'react'
import { Search, Eye } from 'lucide-react'
import Card from '../common/Card'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'

export default function CustomerTable({ customers }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'id', label: 'ID', render: (v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-gray-800">{v}</span> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'totalOrders', label: 'Orders', render: (v) => <span className="font-semibold">{v}</span> },
    { key: 'activeAMC', label: 'AMC', render: (v) => <StatusBadge status={v ? 'active' : 'inactive'} /> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    {
      key: 'id',
      label: '',
      render: (_, row) => (
        <button onClick={() => setSelected(row)} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors">
          <Eye size={15} />
        </button>
      ),
    },
  ]

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-64">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
          />
        </div>
      </div>
      <Card>
        <Table columns={columns} data={filtered} />
        <p className="text-xs text-gray-400 mt-3">{filtered.length} customers found</p>
      </Card>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Customer Details" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">{selected.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              {[
                ['Phone', selected.phone],
                ['City', `${selected.city}, ${selected.state}`],
                ['Joined', selected.joinedDate],
                ['Total Orders', selected.totalOrders],
                ['Active AMC', selected.activeAMC ? 'Yes' : 'No'],
                ['Status', null],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
                  {label === 'Status' ? (
                    <div className="mt-1"><StatusBadge status={selected.status} /></div>
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
