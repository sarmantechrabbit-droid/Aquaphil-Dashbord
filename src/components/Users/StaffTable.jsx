import { Edit2 } from 'lucide-react'
import Card from '../common/Card'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'

export default function StaffTable({ staff }) {
  const staffColumns = [
    { key: 'id', label: 'ID', render: (v) => <span className="font-mono text-xs text-gray-500">{v}</span> },
    { key: 'name', label: 'Name', render: (v) => <span className="font-medium text-gray-800">{v}</span> },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (v) => <span className="capitalize">{v}</span> },
    { key: 'department', label: 'Department' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    {
      key: 'id',
      label: '',
      render: () => (
        <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors">
          <Edit2 size={14} />
        </button>
      ),
    },
  ]

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{staff.length} staff members</p>
      </div>
      <Table columns={staffColumns} data={staff} />
    </Card>
  )
}
