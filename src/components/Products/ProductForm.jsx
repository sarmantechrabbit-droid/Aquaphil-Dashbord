import { useState, useRef } from 'react'
import { X, Upload, Plus, Trash2, CheckCircle2 } from 'lucide-react'

export default function ProductForm({ onSubmit, initialData = null }) {
  // Initial determination if color variants exist
  const hasInitialVariants = !!(initialData?.colorVariants && initialData.colorVariants.length > 0)

  const [hasVariants, setHasVariants] = useState(hasInitialVariants)
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
    capacities: initialData?.capacities?.join(', ') || '',
    mainImage: null,
    gallery: []
  })

  // Color Variant Management
  const [colorVariants, setColorVariants] = useState(initialData?.colorVariants || [])
  const [currentVariant, setCurrentVariant] = useState({
    label: '',
    color: '#FFFFFF',
    mainImage: null,
    gallery: []
  })

  const formMainImageRef = useRef(null)
  const formGalleryRef = useRef(null)
  const variantMainImageRef = useRef(null)
  const variantGalleryRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  // Global Image Handling (Non-variant mode)
  const handleGlobalMainImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, mainImage: URL.createObjectURL(file) }))
    }
  }

  const handleGlobalGallery = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    const newImages = files.map(file => URL.createObjectURL(file))
    setFormData(prev => ({ 
      ...prev, 
      gallery: [...prev.gallery, ...newImages].slice(0, 5) 
    }))
  }

  // Variant Management
  const handleVariantMainImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCurrentVariant(prev => ({ ...prev, mainImage: URL.createObjectURL(file) }))
    }
  }

  const handleVariantGallery = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    const newImages = files.map(file => URL.createObjectURL(file))
    setCurrentVariant(prev => ({ 
      ...prev, 
      gallery: [...prev.gallery, ...newImages].slice(0, 5) 
    }))
  }

  const removeVariantGalleryImage = (idx) => {
    setCurrentVariant(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }))
  }

  const addColorVariant = () => {
    if (!currentVariant.label || !currentVariant.mainImage) {
      alert('Please provide color name and main image')
      return
    }
    setColorVariants(prev => [...prev, { ...currentVariant, id: Date.now().toString() }])
    setCurrentVariant({
      label: '',
      color: '#FFFFFF',
      mainImage: null,
      gallery: []
    })
  }

  const removeVariant = (id) => {
    setColorVariants(prev => prev.filter(v => v.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Clean data based on mode
    const finalData = {
      ...formData,
      capacities: typeof formData.capacities === 'string' ? formData.capacities.split(',').map(s => s.trim()).filter(Boolean) : formData.capacities,
    }

    if (hasVariants) {
      finalData.colorVariants = colorVariants
      finalData.mainImage = null
      finalData.gallery = []
    } else {
      finalData.colorVariants = []
      // mainImage and gallery are already in formData
    }

    onSubmit(finalData)
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

        {/* VARIANT TOGGLE */}
        <div className="md:col-span-2 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
            <div>
                <h4 className="text-sm font-bold text-blue-900">Enable Color Variants</h4>
                <p className="text-[10px] text-blue-600 font-medium">Toggle this if the product comes in different colors</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    checked={hasVariants}
                    onChange={(e) => setHasVariants(e.target.checked)}
                    className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        </div>

        {!hasVariants ? (
          /* STANDARD IMAGES SECTION */
          <div className="md:col-span-2 space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Image</label>
                    <div 
                      onClick={() => formMainImageRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all overflow-hidden"
                    >
                        <input type="file" ref={formMainImageRef} onChange={handleGlobalMainImage} className="hidden" accept="image/*" />
                        {formData.mainImage ? (
                          <img src={formData.mainImage} className="w-full h-full object-contain" />
                        ) : (
                          <>
                            <Upload size={24} className="text-gray-400 mb-2" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Upload</span>
                          </>
                        )}
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gallery (Up to 5)</label>
                    <div className="flex flex-wrap gap-3">
                        {formData.gallery.map((img, i) => (
                          <div key={i} className="w-20 h-20 rounded-xl border border-gray-100 relative group overflow-hidden">
                             <img src={img} className="w-full h-full object-cover" />
                             <button 
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, gallery: p.gallery.filter((_, idx) => idx !== i) }))}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                             >
                                <X size={10} />
                             </button>
                          </div>
                        ))}
                        {formData.gallery.length < 5 && (
                          <button 
                            type="button"
                            onClick={() => formGalleryRef.current?.click()}
                            className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all"
                          >
                            <input type="file" ref={formGalleryRef} multiple onChange={handleGlobalGallery} className="hidden" accept="image/*" />
                            <Plus size={20} />
                          </button>
                        )}
                    </div>
                  </div>
              </div>
          </div>
        ) : (
          /* COLOR VARIANTS SECTION */
          <div className="md:col-span-2 space-y-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                   <h3 className="text-sm font-bold text-gray-900">Color Variants & Images *</h3>
                   <p className="text-[10px] text-gray-500">Each color variant must have its own images</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl border-2 border-dashed border-gray-100 bg-gray-50/30">
                <h4 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-primary" />
                  Add New Color Variant
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Color Name *</label>
                      <input 
                        type="text" 
                        value={currentVariant.label}
                        onChange={(e) => setCurrentVariant(prev => ({ ...prev, label: e.target.value }))}
                        placeholder="e.g. Alpine White"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm transition-all focus:ring-1"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Color Theme</label>
                      <div className="flex gap-2">
                         <input 
                           type="color" 
                           value={currentVariant.color}
                           onChange={(e) => setCurrentVariant(prev => ({ ...prev, color: e.target.value }))}
                           className="w-10 h-10 p-1 rounded-lg border border-gray-200 bg-white cursor-pointer"
                         />
                         <input 
                           type="text" 
                           value={currentVariant.color}
                           onChange={(e) => setCurrentVariant(prev => ({ ...prev, color: e.target.value }))}
                           className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono uppercase"
                           placeholder="#FFFFFF"
                         />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Main Image *</label>
                       <div 
                         onClick={() => variantMainImageRef.current?.click()}
                         className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden"
                       >
                          <input type="file" ref={variantMainImageRef} onChange={handleVariantMainImage} className="hidden" accept="image/*" />
                          {currentVariant.mainImage ? (
                             <img src={currentVariant.mainImage} className="w-full h-full object-contain p-2" />
                          ) : (
                             <Upload size={20} className="text-gray-400" />
                          )}
                       </div>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Gallery (Max 5)</label>
                       <div className="flex flex-wrap gap-2">
                          {currentVariant.gallery.map((img, idx) => (
                            <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white group/img">
                               <img src={img} className="w-full h-full object-cover" />
                               <button 
                                 type="button"
                                 onClick={() => removeVariantGalleryImage(idx)}
                                 className="absolute top-0.5 right-0.5 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                               >
                                  <X size={10} />
                               </button>
                            </div>
                          ))}
                          {currentVariant.gallery.length < 5 && (
                            <button 
                              type="button"
                              onClick={() => variantGalleryRef.current?.click()}
                              className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-200 bg-white hover:border-primary text-gray-400 transition-all flex items-center justify-center"
                            >
                               <input type="file" multiple ref={variantGalleryRef} onChange={handleVariantGallery} className="hidden" accept="image/*" />
                               <Plus size={16} />
                            </button>
                          )}
                       </div>
                    </div>
                </div>

                <button 
                  type="button"
                  onClick={addColorVariant}
                  className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add Color Variant
                </button>
              </div>

              {colorVariants.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Added Variants ({colorVariants.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {colorVariants.map((v) => (
                        <div key={v.id} className="p-3 rounded-2xl border border-gray-100 bg-white shadow-sm flex gap-3 relative group">
                           <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-50 shrink-0 bg-gray-50">
                              <img src={v.mainImage} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="flex items-center gap-1.5 mb-0.5">
                                 <div className="w-2 h-2 rounded-full border border-gray-100" style={{ background: v.color }} />
                                 <h5 className="text-xs font-bold text-gray-800">{v.label}</h5>
                              </div>
                              <p className="text-[9px] text-gray-400 font-medium">{v.gallery.length + 1} Image(s)</p>
                           </div>
                           <button 
                             type="button"
                             onClick={() => removeVariant(v.id)}
                             className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                           >
                              <Trash2 size={12} />
                           </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
          </div>
        )}

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
