import { Plus } from 'lucide-react'
import Card from '../common/Card'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import { amcPlans } from '../../data/dummyData'

export default function PlansTab() {
  const columns = [
    { key: 'name', label: 'Plan Name' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price', render: (v) => `₹${v}` },
    { key: 'services', label: 'Services' },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> }
  ]

  return (
    <Card>
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-gray-800">AMC Plans</h3>
        <button className="text-xs bg-primary text-white px-3 py-1 rounded-lg">New Plan</button>
      </div>
      <Table columns={columns} data={amcPlans} />
    </Card>
  )
}
