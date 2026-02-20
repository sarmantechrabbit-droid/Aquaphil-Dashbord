import StatusBadge from './StatusBadge'

export default function StatusSelect({ status, options, onChange, size = 'sm' }) {
  const handleCycle = (e) => {
    e.stopPropagation()
    const currentIndex = options.indexOf(status)
    const nextIndex = (currentIndex + 1) % options.length
    onChange(options[nextIndex])
  }

  return (
    <div 
      onClick={handleCycle}
      className="cursor-pointer hover:opacity-80 transition-opacity select-none inline-block transform active:scale-95 duration-100"
      title="Click to change status"
    >
      <StatusBadge status={status} size={size} />
    </div>
  )
}
