import { useState } from 'react'
import { motion } from 'framer-motion'
import OverviewCards from '../../components/Dashboard/OverviewCards'
import RecentOrders from '../../components/Dashboard/RecentOrders'
import AMCAlerts from '../../components/Dashboard/AMCAlerts'
import PendingServices from '../../components/Dashboard/PendingServices'
import UpcomingDemos from '../../components/Dashboard/UpcomingDemos'
import SupportSummary from '../../components/Dashboard/SupportSummary'
import Modal from '../../components/common/Modal'
import StatusBadge from '../../components/common/StatusBadge'
import { dashboardStats } from '../../data/dummyData'

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } },
  item: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
}

export default function Dashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <div className="space-y-6">
      <OverviewCards stats={dashboardStats} />

      {/* Row 2 - Orders + AMC Expiry */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-2 gap-4"
      >
        <motion.div variants={stagger.item}>
          <RecentOrders 
            orders={dashboardStats.recentOrders} 
            onSelect={setSelectedOrder} 
          />
        </motion.div>

        <motion.div variants={stagger.item}>
          <AMCAlerts data={dashboardStats.amcExpiringThisMonth} />
        </motion.div>
      </motion.div>

      {/* Row 3 - Services + Demos */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-2 gap-4"
      >
        <motion.div variants={stagger.item}>
          <PendingServices requests={dashboardStats.pendingServiceRequests} />
        </motion.div>

        <motion.div variants={stagger.item}>
          <UpcomingDemos demos={dashboardStats.upcomingDemoBookings} />
        </motion.div>
      </motion.div>

      {/* Ticket Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
      >
        <SupportSummary />
      </motion.div>

      {/* Order Detail Modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Details">
        {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ['Order ID', selectedOrder.id],
                  ['Customer', selectedOrder.customer],
                  ['Product', selectedOrder.product],
                  ['Amount', `₹${(selectedOrder.amount || 0).toLocaleString()}`],
                  ['Payment', selectedOrder.payment],
                  ['Date', selectedOrder.date],
                  ['Delivery Address', selectedOrder.address],
                  ['Status', null],
                ].map(([label, val], i) => (
                  <div key={i} className={label === 'Delivery Address' ? 'col-span-2' : ''}>
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    {label === 'Status'
                      ? <StatusBadge status={selectedOrder.status} />
                      : <p className="text-sm font-medium text-gray-800">{val}</p>
                    }
                  </div>
                ))}
              </div>

              <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                <label className="block text-xs font-semibold text-gray-600 mb-2">Update Order Status</label>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedOrder(prev => ({ ...prev, status: s }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                        selectedOrder.status === s 
                          ? 'bg-primary text-white shadow-md scale-105' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
    </div>
  )
}
