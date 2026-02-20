import { motion } from 'framer-motion'
import {
  Users, Shield, Wrench, TrendingUp, CalendarCheck, HeadphonesIcon
} from 'lucide-react'
import { StatCard } from '../common/Card'

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } },
  item: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
}

export default function OverviewCards({ stats: dashboardStats }) {
  const stats = [
    { icon: Users, label: 'Total Customers', value: (dashboardStats.totalCustomers || 0).toLocaleString(), sub: 'Registered customers', color: 'var(--primary)', trend: 12 },
    { icon: Shield, label: 'Active AMC', value: (dashboardStats.activeAMC || 0).toLocaleString(), sub: 'Active subscriptions', color: '#0891b2', trend: 8 },
    { icon: Wrench, label: 'Pending Services', value: dashboardStats.pendingServices, sub: 'Awaiting assignment', color: '#d97706', trend: -3 },
    { icon: TrendingUp, label: 'Monthly Revenue', value: `₹${((dashboardStats.monthlyRevenue || 0) / 1000).toFixed(0)}K`, sub: 'February 2024', color: '#059669', trend: 15 },
    { icon: CalendarCheck, label: 'Upcoming Demos', value: dashboardStats.upcomingDemos, sub: 'Scheduled this week', color: '#7c3aed', trend: 5 },
    { icon: HeadphonesIcon, label: 'Open Tickets', value: dashboardStats.openTickets, sub: 'Awaiting resolution', color: '#dc2626', trend: -7 },
  ]

  return (
    <motion.div
      variants={stagger.container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6"
    >
      {stats.map((s, i) => (
        <motion.div key={i} variants={stagger.item}>
          <StatCard {...s} />
        </motion.div>
      ))}
    </motion.div>
  )
}
