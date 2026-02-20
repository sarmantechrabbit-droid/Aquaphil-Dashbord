import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = false, padding = 'p-5' }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 8px 25px rgba(16,69,119,0.12)' } : {}}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl border ${padding} ${className}`}
      style={{ borderColor: 'var(--border-color)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      {children}
    </motion.div>
  )
}

export function StatCard({ icon: Icon, label, value, sub, color = 'var(--primary)', trend }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(16,69,119,0.12)' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border p-5 flex items-start justify-between cursor-default h-full"
      style={{ borderColor: 'var(--border-color)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium mb-1 truncate">{label}</p>
        <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1 truncate">{sub}</p>}
        {trend && (
          <p className={`text-xs font-medium mt-1 ${trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% this month
          </p>
        )}
      </div>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ml-3" style={{ background: `${color}18` }}>
        <Icon size={20} style={{ color }} />
      </div>
    </motion.div>
  )
}
