import { Search } from 'lucide-react'
import { useState } from 'react'
import Pagination from './Pagination'
import { motion } from "framer-motion";

export default function Table({
  columns,
  data,
  title,
  actions,
  searchKey,
  emptyMessage = 'No records found'
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = searchKey
    ? data.filter(row =>
        String(row[searchKey] || '').toLowerCase().includes(search.toLowerCase())
      )
    : data

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      {/* Header */}
      {(title || actions || searchKey) && (
        <div className="px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          {title && <h3 className="font-display font-semibold text-gray-800 text-sm whitespace-nowrap">{title}</h3>}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {searchKey && (
              <div className="relative flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border rounded-lg focus:outline-none focus:ring-1 w-full sm:w-44"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>
            )}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--bg-light)' }}>
              {columns.map(col => (
                <th key={col.key} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-gray-400 text-sm">{emptyMessage}</td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <motion.tr
                  key={row.id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t hover:bg-gray-50/60 transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  {columns.map(col => (
                    <td key={col.key} className="px-5 py-3.5 whitespace-nowrap text-gray-700">
                      {col.render ? (col.render(row[col.key], row) || '—') : (row[col.key] || '—')}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filtered.length}
        itemsPerPage={perPage}
      />
    </div>
  )
}
