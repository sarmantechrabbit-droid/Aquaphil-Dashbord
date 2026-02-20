import { useState } from 'react'
import { staff } from '../../data/dummyData'

export default function AssignTechnicianForm({ onSubmit, initialAgent = '' }) {
  const [agent, setAgent] = useState(initialAgent)
  
  const technicians = staff.filter(s => s.role === 'Technician' || s.role === 'Staff')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(agent)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase">Select Technician</label>
        <select 
          required 
          value={agent} 
          onChange={e => setAgent(e.target.value)} 
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1" 
          style={{ borderColor: 'var(--border-color)' }}
        >
          <option value="">-- Choose Agent --</option>
          {technicians.map(t => (
            <option key={t.id} value={t.name}>{t.name} ({t.department})</option>
          ))}
        </select>
      </div>
      
      <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-xs">
        Assigning a technician will update the request status to <b>Assigned</b> automatically.
      </div>

      <div className="pt-4 flex justify-end gap-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white rounded-xl shadow-md" style={{ background: 'var(--primary)' }}>
          Assign Technician
        </button>
      </div>
    </form>
  )
}
