import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Eye, ShoppingBag, ShieldCheck, Wrench, Headphones, User } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { 
  customers as initialCustomers,
  orders,
  amcSubscriptions,
  serviceRequests,
  supportTickets
} from '../../data/dummyData'
import CustomerForm from './CustomerForm'

export default function CustomerList() {
  const [data, setData] = useState(initialCustomers)
  const [selected, setSelected] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleAddSubmit = (newCustomer) => {
    const customerWithId = {
      ...newCustomer,
      id: `CUST${String(data.length + 1).padStart(3, '0')}`,
      products: 0,
      totalSpend: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    }
    setData([customerWithId, ...data])
    setShowAdd(false)
  }

  const customerData = useMemo(() => {
    if (!selected) return null;
    return {
      orders: orders.filter(o => o.customerId === selected.id),
      subscriptions: amcSubscriptions.filter(s => s.customerId === selected.id),
      services: serviceRequests.filter(s => s.customerId === selected.id),
      tickets: supportTickets.filter(t => t.customerId === selected.id)
    }
  }, [selected])

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'products', label: 'Products', render: v => <span className="font-semibold">{v || 0}</span> },
    { key: 'amcActive', label: 'AMC', render: v => <StatusBadge status={v ? 'Active' : 'Inactive'} /> },
    { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
    { key: 'totalSpend', label: 'Total Spend', render: v => `₹${(v || 0).toLocaleString()}` },
    {
      key: 'id', label: 'Action', render: (_, row) => (
        <button 
          onClick={() => { setSelected(row); setActiveTab('overview'); }} 
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors" 
          style={{ color: 'var(--primary)' }}
        >
          <Eye size={13} /> View
        </button>
      )
    }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'products', label: 'Purchased Products', icon: ShoppingBag },
    { id: 'amc', label: 'AMC Subscriptions', icon: ShieldCheck },
    { id: 'services', label: 'Service History', icon: Wrench },
    { id: 'tickets', label: 'Support Tickets', icon: Headphones },
  ]

  return (
    <div className="space-y-4">
      <Table
        title="Customer List"
        data={data}
        columns={columns}
        searchKey="name"
        actions={
          <button 
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:opacity-90"
            style={{ background: 'var(--primary)' }}>
            <UserPlus size={13} /> Add Customer
          </button>
        }
      />
      
      {/* View Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Customer Details" width="max-w-6xl">
        {selected && (
          <div className="flex flex-col h-[70vh]">
            <div className="flex border-b border-gray-100 mb-4 select-none overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-1">
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(selected).map(([k, v]) => (
                      <div key={k} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100/50">
                        <p className="text-xs text-gray-400 capitalize mb-1 font-bold tracking-wider">{k.replace(/([A-Z])/g, ' $1')}</p>
                        {k === 'status' ? <StatusBadge status={v} /> :
                         k === 'amcActive' ? <StatusBadge status={v ? 'Active' : 'Inactive'} /> :
                         k === 'totalSpend' ? <p className="text-lg font-bold text-gray-800">₹{(v || 0).toLocaleString()}</p> :
                         <p className="text-sm font-semibold text-gray-700">{String(v ?? '—')}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                    <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">Update Account Status</label>
                    <div className="flex flex-wrap gap-2">
                      {['active', 'inactive', 'suspended'].map(s => (
                        <button
                          key={s}
                          onClick={() => {
                            setData(prev => prev.map(item => item.id === selected.id ? { ...item, status: s } : item))
                            setSelected(prev => ({ ...prev, status: s }))
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all border ${
                            selected.status === s 
                              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'products' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                   {customerData.orders.length > 0 ? (
                     <div className="grid grid-cols-1 gap-4">
                       {customerData.orders.map(order => (
                         <div key={order.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-white">
                           <div className="space-y-1">
                             <p className="font-bold text-gray-800">{order.product}</p>
                             <p className="text-xs text-gray-500">Ordered on: {order.date} • ID: {order.id}</p>
                           </div>
                           <div className="text-right space-y-1">
                             <p className="font-bold text-primary">₹{order.amount.toLocaleString()}</p>
                             <StatusBadge status={order.status} />
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-12 text-gray-400 italic">No products purchased yet.</div>
                   )}
                </div>
              )}

              {activeTab === 'amc' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {customerData.subscriptions.length > 0 ? (
                     <div className="grid grid-cols-1 gap-4">
                       {customerData.subscriptions.map(sub => (
                         <div key={sub.id} className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-white space-y-3">
                           <div className="flex justify-between items-start">
                             <div>
                               <p className="font-bold text-gray-800 text-lg">{sub.plan}</p>
                               <p className="text-sm text-gray-500">{sub.product}</p>
                             </div>
                             <StatusBadge status={sub.status} />
                           </div>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              <div>
                                <p className="text-gray-400">Start Date</p>
                                <p className="font-semibold">{sub.startDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">End Date</p>
                                <p className="font-semibold">{sub.endDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Amount</p>
                                <p className="font-semibold">₹{sub.amount}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Next Service</p>
                                <p className="font-semibold">{sub.nextService || 'N/A'}</p>
                              </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-12 text-gray-400 italic">No active AMC subscriptions.</div>
                   )}
                </div>
              )}
              
              {activeTab === 'services' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {customerData.services.length > 0 ? (
                     <div className="grid grid-cols-1 gap-4">
                       {customerData.services.map(srv => (
                         <div key={srv.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-white gap-4">
                           <div className="space-y-1">
                             <div className="flex items-center gap-2">
                               <p className="font-bold text-gray-800">{srv.issue}</p>
                               <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                                 srv.priority === 'high' ? 'bg-red-50 text-red-600' : 
                                 srv.priority === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                               }`}>{srv.priority}</span>
                             </div>
                             <p className="text-xs text-gray-500">Scheduled: {srv.scheduledDate} • Assigned to: {srv.assignedTo || 'Unassigned'}</p>
                           </div>
                           <StatusBadge status={srv.status} />
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-12 text-gray-400 italic">No service history found.</div>
                   )}
                </div>
              )}

              {activeTab === 'tickets' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                 {customerData.tickets.length > 0 ? (
                     <div className="grid grid-cols-1 gap-4">
                       {customerData.tickets.map(ticket => (
                         <div key={ticket.id} className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow bg-white space-y-2">
                           <div className="flex justify-between">
                             <p className="font-bold text-gray-800">{ticket.subject}</p>
                             <StatusBadge status={ticket.status} />
                           </div>
                           <p className="text-sm text-gray-600">{ticket.category} • Created: {ticket.createdAt}</p>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-12 text-gray-400 italic">No support tickets raised.</div>
                   )}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Customer">
        <CustomerForm onSubmit={handleAddSubmit} />
      </Modal>
    </div>
  )
}
