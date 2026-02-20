import { useState, useRef } from 'react'
import { Eye, FileText, Printer, Download, X, Trash2, Edit2 } from 'lucide-react'
import DeleteModal from '../common/DeleteModal'
import { useReactToPrint } from 'react-to-print'
import Table from '../common/Table'
import StatusSelect from '../common/StatusSelect'
import StatusBadge from '../common/StatusBadge'
import Modal from '../common/Modal'
import { useData } from '../../context/DataContext'
import { customers, systemSettings } from '../../data/dummyData'

export default function OrderTable() {
  const { orders, updateOrder, deleteOrder } = useData()
  const [selected, setSelected] = useState(null)
  const [showInvoice, setShowInvoice] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)
  const invoiceRef = useRef()

  const handleDelete = () => {
    deleteOrder(isDeleting)
    setIsDeleting(null)
    if (selected?.id === isDeleting) setSelected(null)
  }

  const handleStatusUpdate = (id, status) => {
    updateOrder(id, { status })
    if (selected?.id === id) {
      setSelected(prev => ({ ...prev, status }))
    }
  }

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice_${selected?.id}`,
  })

  // Helper to get full customer details based on order's customerId
  const getCustomerDetails = (customerId) => {
    return customers.find(c => c.id === customerId) || {}
  }

  const columns = [
    { key: 'id', label: 'Order ID', render: v => <span className="font-mono text-xs font-semibold text-blue-700">{v || '—'}</span> },
    { key: 'customer', label: 'Customer', render: v => v || '—' },
    { key: 'product', label: 'Product', render: v => v || '—'} ,
    { key: 'amount', label: 'Amount', render: v => v != null ? <span className="font-semibold">₹{v.toLocaleString()}</span> : '—' },
    { key: 'date', label: 'Date' },
    { key: 'payment', label: 'Payment', render: v => <StatusBadge status={v} /> },
    {
      key: 'status',
      label: 'Status',
      render: (v, row) => (
        <StatusSelect
          status={v}
          options={['pending', 'processing', 'shipped', 'delivered', 'cancelled']}
          onChange={(newStatus) => handleStatusUpdate(row.id, newStatus)}
        />
      )
    },
    {
      key: 'id', label: 'Actions', render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelected(row)}
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
            style={{ color: 'var(--primary)' }}
            title="View Details"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => { setSelected(row); setShowInvoice(true); }}
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors text-gray-600"
            title="View Invoice"
          >
            <FileText size={14} />
          </button>
          <button
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors text-gray-600 hover:text-amber-600"
            title="Edit Order"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => setIsDeleting(row.id)}
            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 text-red-600 transition-colors"
            title="Delete Order"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ]

  const InvoiceTemplate = ({ order, customer }) => {
    if (!order) return null;

    // Tax calculation (Mock logic: assuming 18% GST included in total)
    const taxRate = 0.18;
    const baseAmount = order.amount / (1 + taxRate);
    const taxAmount = order.amount - baseAmount;

    return (
      <div ref={invoiceRef} className="bg-white p-8 max-w-3xl mx-auto h-full text-sm">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-2">Invoice</h1>
            <p className="font-medium text-gray-900">{systemSettings.general.companyName}</p>
            <p className="text-gray-500 max-w-xs">{systemSettings.general.address}</p>
            <p className="text-gray-500">GSTIN: {systemSettings.general.gstNumber}</p>
            <p className="text-gray-500">{systemSettings.general.email}</p>
          </div>
          <div className="text-right">
            <div className="inline-block bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 text-left">
               <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Invoice Info</p>
               <p className="text-gray-900 font-bold mb-0.5">#{order.id}</p>
               <p className="text-gray-500 text-xs">Date: {order.date}</p>
               <div className="mt-2">
                  <StatusBadge status={order.payment === 'COD' && order.status !== 'delivered' ? 'pending' : 'paid'} />
               </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bill To</h2>
          <div className="text-gray-800">
            <p className="font-bold text-lg">{order.customer}</p>
            <p>{order.address}</p>
            {customer && (
              <div className="mt-2 text-gray-500 text-xs space-y-0.5">
                <p>Phone: {customer.phone}</p>
                <p>Email: {customer.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-0">
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left font-bold text-gray-600 uppercase text-xs tracking-wider">Product</th>
                <th className="py-3 px-4 text-center font-bold text-gray-600 uppercase text-xs tracking-wider w-24">Qty</th>
                <th className="py-3 px-4 text-right font-bold text-gray-600 uppercase text-xs tracking-wider w-32">Price</th>
                <th className="py-3 px-4 text-right font-bold text-gray-600 uppercase text-xs tracking-wider w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4">
                  <p className="font-semibold text-gray-900">{order.product}</p>
                  <p className="text-xs text-gray-500 mt-0.5">SKU: PROD-XYZ</p>
                </td>
                <td className="py-4 px-4 text-center text-gray-600">1</td>
                <td className="py-4 px-4 text-right text-gray-600">₹{baseAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td className="py-4 px-4 text-right font-medium text-gray-900">₹{baseAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{baseAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{taxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
              <span className="font-bold text-lg text-gray-900">Grand Total</span>
              <span className="font-bold text-lg text-primary">₹{order.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-xs leading-relaxed">
          <p className="font-medium text-gray-600 mb-1">Thank you for your business!</p>
          <p>This is a computer-generated invoice and does not require a signature.</p>
          <p>For any queries, please contact {systemSettings.general.email} or call {systemSettings.general.phone}.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Table
        title="Recent Orders"
        data={orders}
        columns={columns}
        searchKey="customer"
      />

      {/* View Details Modal */}
      <Modal isOpen={!!selected && !showInvoice} onClose={() => setSelected(null)} title="Order Details" width="max-w-2xl">
        {selected && (
          <div className="space-y-6">
             <div className="flex items-start justify-between">
                <div>
                   <h3 className="text-xl font-bold text-gray-800">{selected.product}</h3>
                   <span className="text-sm text-gray-500">Ordered on {selected.date}</span>
                </div>
                <StatusBadge status={selected.status} />
             </div>

             <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-b border-gray-100 py-6">
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                   <p className="font-semibold text-gray-900">{selected.customer}</p>
                   {(() => {
                      const cust = getCustomerDetails(selected.customerId);
                      return cust.email ? (
                         <p className="text-xs text-gray-500 mt-1">{cust.email}<br/>{cust.phone}</p>
                      ) : null;
                   })()}
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                   <p className="font-mono font-medium text-gray-700">{selected.id}</p>
                </div>
                <div className="col-span-2">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Delivery Address</p>
                   <p className="font-medium text-gray-700">{selected.address}</p>
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                   <p className="font-medium text-gray-700">{selected.paymentMethod}</p>
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Status</p>
                   <StatusBadge status={selected.payment} />
                </div>
             </div>

             <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Update Order Status</label>
               <div className="flex flex-wrap gap-2">
                 {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                   <button
                     key={s}
                     onClick={() => handleStatusUpdate(selected.id, s)}
                     className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                       selected.status === s 
                         ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                         : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                     }`}
                   >
                     {s}
                   </button>
                 ))}
               </div>
             </div>

             <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-primary">₹{selected.amount.toLocaleString()}</span>
             </div>
             
             <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setShowInvoice(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                   <FileText size={16} /> View Invoice
                </button>
             </div>
          </div>
        )}
      </Modal>

      {/* Invoice Modal */}
      {showInvoice && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                 <h2 className="font-bold text-gray-800 flex items-center gap-2">
                    <FileText size={18} className="text-primary"/> Invoice View
                 </h2>
                 <div className="flex items-center gap-2">
                    <button 
                       onClick={handlePrint}
                       className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                       <Printer size={14} /> Print
                    </button>
                    <button 
                       onClick={() => setShowInvoice(false)}
                       className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
                    >
                       <X size={18} />
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/50 p-6">
                 <div className="shadow-lg rounded-none">
                    <InvoiceTemplate order={selected} customer={getCustomerDetails(selected.customerId)} />
                 </div>
              </div>
           </div>
        </div>
      )}

      <DeleteModal 
        isOpen={!!isDeleting} 
        onClose={() => setIsDeleting(null)} 
        onConfirm={handleDelete}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
      />
    </>
  )
}
