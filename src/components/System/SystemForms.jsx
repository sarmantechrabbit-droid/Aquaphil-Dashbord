import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '../common/Card'
import { Settings, Shield, Wrench, Save, Check } from 'lucide-react'

function SettingField({ label, type = 'text', value, placeholder }) {
  const [enabled, setEnabled] = useState(true)

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {type === 'textarea' ? (
        <textarea rows={3} defaultValue={value} placeholder={placeholder}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none bg-white"
          style={{ borderColor: 'var(--border-color)' }} />
      ) : type === 'toggle' ? (
        <div className="flex items-center gap-2">
          <div 
            onClick={() => setEnabled(!enabled)}
            className="w-10 h-5 rounded-full relative cursor-pointer transition-colors" 
            style={{ background: enabled ? 'var(--primary)' : '#e5e7eb' }}
          >
            <motion.div 
              animate={{ x: enabled ? 20 : 0 }}
              className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow" 
            />
          </div>
          <span className="text-sm text-gray-700">{enabled ? 'Enabled' : 'Disabled'}</span>
        </div>
      ) : (
        <input type={type} defaultValue={value} placeholder={placeholder}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 bg-white"
          style={{ borderColor: 'var(--border-color)' }} />
      )}
    </div>
  )
}

export function GeneralSettingsForm() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <Settings size={16} style={{ color: 'var(--primary)' }} />
          <h3 className="font-display font-semibold text-gray-800">General Settings</h3>
        </div>
        <div className="space-y-4">
          <SettingField label="Company Name" value="Aquaphil Water Purifiers" />
          <SettingField label="Support Email" value="support@aquaphil.com" type="email" />
          <SettingField label="Support Phone" value="+91 98765 43210" />
          <SettingField label="Company Address" value="123 Water Park, Ahmedabad, Gujarat 380001" type="textarea" />
          <SettingField label="GST Number" value="24AABCA1234A1Z5" />
          <SettingField label="Maintenance Mode" type="toggle" />
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="mt-5 flex items-center gap-2 text-white text-sm font-medium px-6 py-2 rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-md disabled:opacity-70"
          style={{ background: saved ? '#059669' : 'var(--primary)' }}>
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 
           saved ? <Check size={14} /> : <Save size={14} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </Card>
    </div>
  )
}

export function AMCSettingsForm() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <Shield size={16} style={{ color: 'var(--primary)' }} />
          <h3 className="font-display font-semibold text-gray-800">AMC Settings</h3>
        </div>
        <div className="space-y-4">
          <SettingField label="AMC Expiry Alert Days" value="30" type="number" />
          <SettingField label="Auto Renewal Notification" type="toggle" />
          <SettingField label="Grace Period (Days after expiry)" value="7" type="number" />
          <SettingField label="AMC Renewal Discount (%)" value="10" type="number" />
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="mt-5 flex items-center gap-2 text-white text-sm font-medium px-6 py-2 rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-md disabled:opacity-70"
          style={{ background: saved ? '#059669' : 'var(--primary)' }}>
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 
           saved ? <Check size={14} /> : <Save size={14} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </Card>
    </div>
  )
}

export function ServiceTypeSettingsList() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [typesState, setTypesState] = useState([
    { name: 'AMC Service', active: true },
    { name: 'Paid Service', active: true },
    { name: 'Emergency Service', active: true },
    { name: 'Installation Service', active: false },
  ])

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  const toggleType = (index) => {
    setTypesState(prev => prev.map((t, i) => i === index ? { ...t, active: !t.active } : t))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <Wrench size={16} style={{ color: 'var(--primary)' }} />
          <h3 className="font-display font-semibold text-gray-800">Service Type Settings</h3>
        </div>
        <div className="space-y-3">
          {typesState.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-medium text-gray-700">{t.name}</span>
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => toggleType(i)}
                  className="w-9 h-4 rounded-full relative cursor-pointer transition-colors" 
                  style={{ background: t.active ? 'var(--primary)' : '#e5e7eb' }}>
                  <motion.div 
                    animate={{ x: t.active ? 20 : 0 }}
                    className="w-3 h-3 bg-white rounded-full absolute left-0.5 top-0.5 shadow" 
                  />
                </div>
                <span className="text-xs text-gray-500 w-12">{t.active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="mt-5 flex items-center gap-2 text-white text-sm font-medium px-6 py-2 rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-md disabled:opacity-70"
          style={{ background: saved ? '#059669' : 'var(--primary)' }}>
          {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 
           saved ? <Check size={14} /> : <Save size={14} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </Card>
    </div>
  )
}
