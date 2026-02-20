import { useState, useRef } from 'react'
import { X, Upload, Plus, Trash2 } from 'lucide-react'

export default function ProductForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    sku: '',
    category: 'Water Purifiers',
    mrp: '',
    price: '',
    stock: '',
    status: 'active',
    rating: 5,
    reviewsCount: 0,
    description: '',
    shippingReturns: '',
    returnPolicies: '',
    capacities: initialData?.capacities?.join(', ') || ''
  })

  const [colorVariants, setColorVariants] = useState(initialData?.colorVariants || [
    { id: Date.now().toString(), color: '#FFFFFF', label: 'White', images: [] }
  ])

  const fileInputRefs = useRef({})

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  // Variant Management
  const addVariant = () => {
    setColorVariants(prev => [
      ...prev,
      { id: Date.now().toString(), color: '#000000', label: 'New Color', images: [] }
    ])
  }

  const removeVariant = (id) => {
    setColorVariants(prev => prev.filter(v => v.id !== id))
  }

  const updateVariant = (id, field, value) => {
    setColorVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v))
  }

  const handleVariantImageChange = (id, e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newImages = files.map(file => URL.createObjectURL(file))
    setColorVariants(prev => prev.map(v => v.id === id ? { ...v, images: [...v.images, ...newImages] } : v))
  }

  const removeVariantImage = (variantId, imgIdx) => {
    setColorVariants(prev => prev.map(v => v.id === variantId ? { 
      ...v, 
      images: v.images.filter((_, i) => i !== imgIdx) 
    } : v))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedData = {
      ...formData,
      colorVariants,
      capacities: typeof formData.capacities === 'string' ? formData.capacities.split(',').map(s => s.trim()).filter(Boolean) : formData.capacities,
    }
    onSubmit(formattedData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-2 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Info */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1"
            style={{ borderColor: 'var(--border-color)' }}
            placeholder="e.g. Aquaphil Glam"
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1"
            style={{ borderColor: 'var(--border-color)' }}
            placeholder="Detailed description..."
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipping and Returns</label>
          <textarea
            name="shippingReturns"
            value={formData.shippingReturns}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1"
            style={{ borderColor: 'var(--border-color)' }}
            placeholder="Shipping and returns policy..."
          />
        </div>

        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Return Policies</label>
          <textarea
            name="returnPolicies"
            value={formData.returnPolicies}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1"
            style={{ borderColor: 'var(--border-color)' }}
            placeholder="Return policies..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SKU</label>
          <input required name="sku" value={formData.sku} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg font-mono" placeholder="AQ-GL-01" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg">
            <option>Water Purifiers</option>
            <option>Filters & Cartridges</option>
            <option>UV Sterilizers</option>
            <option>Water Softeners</option>
            <option>Accessories</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price (₹)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MRP (₹)</label>
            <input required type="number" name="mrp" value={formData.mrp} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg" />
          </div>
        </div>

        {/* Color Variants Section */}
        <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Color Image Variants</label>
            <button 
              type="button" 
              onClick={addVariant}
              className="flex items-center gap-1.5 text-[10px] font-bold text-primary px-2 py-1 rounded bg-primary/5 hover:bg-primary/10 transition-colors uppercase"
            >
              <Plus size={12} /> Add Variant
            </button>
          </div>

          <div className="space-y-6">
            {colorVariants.map((variant, vIdx) => (
              <div key={variant.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 space-y-4 relative group">
                {colorVariants.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeVariant(variant.id)}
                    className="absolute -top-2 -right-2 p-1.5 bg-white text-red-500 rounded-full border border-gray-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Color Code</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={variant.color} 
                        onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                        className="w-10 h-9 p-1 rounded-lg border bg-white cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={variant.color} 
                        onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                        className="flex-1 px-3 py-2 text-xs border rounded-lg font-mono uppercase"
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Color Label</label>
                    <input 
                      type="text" 
                      value={variant.label} 
                      onChange={(e) => updateVariant(variant.id, 'label', e.target.value)}
                      className="w-full px-3 py-2 text-xs border rounded-lg"
                      placeholder="e.g. Arctic White"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Variant Images</label>
                  <div className="flex flex-wrap gap-2">
                    {variant.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white group/img">
                        <img src={img} className="w-full h-full object-contain p-1" />
                        <button 
                          type="button" 
                          onClick={() => removeVariantImage(variant.id, imgIdx)}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={() => fileInputRefs.current[variant.id]?.click()}
                      className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary bg-white transition-all"
                    >
                      <Upload size={14} />
                      <span className="text-[8px] font-bold uppercase mt-1">Add</span>
                    </button>
                    <input 
                      type="file" 
                      hidden 
                      multiple 
                      accept="image/*"
                      ref={el => fileInputRefs.current[variant.id] = el}
                      onChange={(e) => handleVariantImageChange(variant.id, e)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Details */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capacities (Comma separated)</label>
          <input name="capacities" value={formData.capacities} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg" placeholder="7 L, 10 L, 12 L" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</label>
            <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 text-sm border rounded-lg">
              <option value="active">Active</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6 sticky bottom-0 bg-white border-t flex justify-end gap-3" style={{ borderColor: 'var(--border-color)' }}>
        <button type="submit" className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all">
          {initialData ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  )
}
