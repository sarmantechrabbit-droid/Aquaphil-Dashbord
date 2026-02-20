export default function MiniTable({ rows, cols, emptyMsg = 'No data' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--bg-light)' }}>
            {cols.map(c => (
              <th key={c.key} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={cols.length} className="text-center py-8 text-gray-400 text-xs">{emptyMsg}</td></tr>
          ) : rows.map((row, i) => (
            <tr key={row.id || i} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--border-color)' }}>
              {cols.map(c => (
                <td key={c.key} className="px-4 py-3 text-gray-700 text-xs">
                  {c.render ? (c.render(row[c.key], row) || '—') : (row[c.key] || '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
