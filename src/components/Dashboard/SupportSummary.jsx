import { HeadphonesIcon, Clock, Wrench, CheckCircle } from 'lucide-react'
import SectionCard from './SectionCard'

export default function SupportSummary() {
  const summary = [
    { label: 'Total Tickets', value: 5, color: 'var(--primary)', icon: HeadphonesIcon },
    { label: 'Open', value: 2, color: '#ca8a04', icon: Clock },
    { label: 'In Progress', value: 1, color: '#2563eb', icon: Wrench },
    { label: 'Resolved', value: 2, color: '#16a34a', icon: CheckCircle },
  ]

  return (
    <SectionCard title="Support Ticket Summary" icon={HeadphonesIcon} iconColor="#dc2626">
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summary.map((t, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${t.color}10` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${t.color}20` }}>
              <t.icon size={16} style={{ color: t.color }} />
            </div>
            <div>
              <p className="text-xl font-display font-bold" style={{ color: t.color }}>{t.value}</p>
              <p className="text-xs text-gray-500">{t.label}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
