import { Shield } from 'lucide-react'
import Card from '../common/Card'

export default function RolePermissionTable({ roles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {roles.map((role) => (
        <Card key={role.id} hover>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield size={15} className="text-primary" />
              </div>
              <h4 className="font-semibold text-gray-800">{role.name}</h4>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{role.userCount} users</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {role.permissions.map((p) => (
              <span key={p} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full capitalize">{p}</span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
