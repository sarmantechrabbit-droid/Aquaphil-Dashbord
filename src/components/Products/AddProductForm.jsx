import { useState, useRef } from 'react'
import { Upload, X, ChevronDown, Check, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { categories } from '../../data/dummyData'

export default function AddProductForm({ onSubmit }) {
  const navigate = useNavigate()
  const [hasVariants, setHasVariants] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shippingReturns: '',
    returnPolicies: '',
    category: 'Water Purifiers',
    city: '',
    mrp: '',
    price: '',
    sku: '',
    stock: '',
    status: 'active',
    mainImage: null,
    gallery: []
  })
  
  // Color Variant Management
  const [colorVariants, setColorVariants] = useState([])
  const [currentVariant, setCurrentVariant] = useState({
    label: '',
    color: '#FFFFFF',
    mainImage: null,
    gallery: []
  })

  const [activeTab, setActiveTab] = useState('description')
  
  const formMainImageRef = useRef(null)
  const formGalleryRef = useRef(null)
  const variantMainImageRef = useRef(null)
  const variantGalleryRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
    
    if (hasVariants && colorVariants.length === 0) {
      alert('Please add at least one color variant or disable color variants mode.')
      return
    }

    if (!hasVariants && !formData.mainImage) {
      alert('Please upload a main product image.')
      return
    }

    const newProduct = {
      ...formData,
      mrp: Number(formData.mrp),
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    if (hasVariants) {
      newProduct.colorVariants = colorVariants
      newProduct.mainImage = null
      newProduct.gallery = []
    } else {
      newProduct.colorVariants = []
    }

    onSubmit(newProduct)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Input Fields */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Card 1: Product Media (Color & Images) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-50">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Product Media</h3>
                    <p className="text-sm text-gray-500">Enable variants if the product has different colors</p>
                </div>

                <div className="mt-4 md:mt-0 p-3 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4 transition-all hover:bg-blue-50">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-900 leading-tight">Enable Color Variants</span>
                        <span className="text-[10px] text-blue-600 font-medium tracking-tight">Support multiple color sets</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={hasVariants}
                            onChange={(e) => setHasVariants(e.target.checked)}
                            className="sr-only peer" 
                        />
                        <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            
            {!hasVariants ? (
              /* STANDARD IMAGES SECTION */
              <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Product Image *</label>
                        <div 
                          onClick={() => formMainImageRef.current?.click()}
                          className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50/30 transition-all overflow-hidden group"
                        >
                            <input type="file" ref={formMainImageRef} onChange={handleGlobalMainImage} className="hidden" accept="image/*" />
                            {formData.mainImage ? (
                              <img src={formData.mainImage} className="w-full h-full object-contain p-4" />
                            ) : (
                              <>
                                <Upload size={24} className="text-gray-400 mb-2 group-hover:text-primary transition-colors" />
                                <span className="text-[10px] font-black text-gray-500 uppercase group-hover:text-primary transition-colors">Upload</span>
                              </>
                            )}
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Gallery (Up to 5)</label>
                        <div className="flex flex-wrap gap-3">
                            {formData.gallery.map((img, i) => (
                              <div key={i} className="w-24 h-24 rounded-2xl border border-gray-100 relative group overflow-hidden shadow-sm">
                                 <img src={img} className="w-full h-full object-cover" />
                                 <button 
                                    type="button"
                                    onClick={() => setFormData(p => ({ ...p, gallery: p.gallery.filter((_, idx) => idx !== i) }))}
                                    className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                    <X size={10} />
                                 </button>
                              </div>
                            ))}
                            {formData.gallery.length < 5 && (
                              <button 
                                type="button"
                                onClick={() => formGalleryRef.current?.click()}
                                className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all bg-gray-50/30"
                              >
                                <input type="file" ref={formGalleryRef} multiple onChange={handleGlobalGallery} className="hidden" accept="image/*" />
                                <Plus size={24} />
                              </button>
                            )}
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium">Add more perspectives of the product.</p>
                      </div>
                  </div>
              </div>
            ) : (
              /* COLOR VARIANTS SECTION */
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Add New Color Variant Form */}
                <div className="p-6 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/30 mb-8">
                  <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    New Color Variant Setup
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600">Color Name *</label>
                        <input 
                          type="text" 
                          value={currentVariant.label}
                          onChange={(e) => setCurrentVariant(prev => ({ ...prev, label: e.target.value }))}
                          placeholder="e.g. Alpine White, Jet Black"
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600">Color Palette</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={currentVariant.color}
                            onChange={(e) => setCurrentVariant(prev => ({ ...prev, color: e.target.value }))}
                            className="w-12 h-10 p-1 rounded-lg border border-gray-200 bg-white cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={currentVariant.color}
                            onChange={(e) => setCurrentVariant(prev => ({ ...prev, color: e.target.value }))}
                            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-mono uppercase"
                            placeholder="#FFFFFF"
                          />
                        </div>
                    </div>
                  </div>

                  {/* Main Image Upload */}
                  <div className="space-y-1.5 mb-6">
                    <label className="text-xs font-bold text-gray-600">Main Image for this color *</label>
                    <div 
                      onClick={() => variantMainImageRef.current?.click()}
                      className="w-full h-48 rounded-2xl border-2 border-dashed border-gray-200 bg-white hover:border-primary hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center group overflow-hidden"
                    >
                        <input 
                          type="file" 
                          ref={variantMainImageRef}
                          onChange={handleVariantMainImage}
                          className="hidden" 
                          accept="image/*"
                        />
                        {currentVariant.mainImage ? (
                          <img src={currentVariant.mainImage} className="w-full h-full object-contain p-4" />
                        ) : (
                          <>
                            <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors mb-2">
                              <Upload size={24} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">Upload Color Main</span>
                            <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
                          </>
                        )}
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div className="space-y-1.5 mb-8">
                    <label className="text-xs font-bold text-gray-600">Variant Gallery (Max 5)</label>
                    <div className="flex flex-wrap gap-3">
                        {currentVariant.gallery.map((img, idx) => (
                          <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-white group/img shadow-sm">
                            <img src={img} className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => removeVariantGalleryImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity"
                            >
                                <X size={10} />
                            </button>
                          </div>
                        ))}
                        {currentVariant.gallery.length < 5 && (
                          <button 
                            type="button"
                            onClick={() => variantGalleryRef.current?.click()}
                            className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 bg-white hover:border-primary hover:text-primary transition-all flex items-center justify-center text-gray-400"
                          >
                            <input 
                              type="file" 
                              multiple 
                              ref={variantGalleryRef}
                              onChange={handleVariantGallery}
                              className="hidden" 
                              accept="image/*"
                            />
                            <Plus size={24} />
                          </button>
                        )}
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={addColorVariant}
                    className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Plus size={20} /> Add Color Variant
                  </button>
                </div>

                {/* Added Variants List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <span className="w-1 h-4 bg-blue-600 rounded-full" />
                      Current Variants ({colorVariants.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AnimatePresence>
                        {colorVariants.map((variant) => (
                          <motion.div 
                            key={variant.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-4 rounded-2xl border border-gray-100 shadow-sm bg-white relative flex gap-4 transition-all hover:border-blue-100 group"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-50 shrink-0 bg-gray-50">
                                <img src={variant.mainImage} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-2.5 h-2.5 rounded-full border border-gray-100" style={{ backgroundColor: variant.color }}></div>
                                  <h5 className="text-sm font-bold text-gray-800">{variant.label}</h5>
                                </div>
                                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{variant.color}</p>
                                <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-tighter">{variant.gallery.length + 1} TOTAL IMAGES</p>
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeVariant(variant.id)}
                              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                  </div>
                  {colorVariants.length === 0 && (
                    <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No color variants added yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>

        {/* Card 2: Product Name & Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
           <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">General Information</h3>
            
            <section className="space-y-8">
            
            {/* Product Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Product Title *</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aquaphil RO Water Purifier"
                className="w-full px-5 py-3 bg-gray-50/80 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Product Details Tabs (Description, etc) */}
            <div className="space-y-4">
              <div className="flex gap-8 border-b border-gray-100">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'shippingReturns', label: 'Shipping & Returns' },
                  { id: 'returnPolicies', label: 'Return Policies' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-xs font-black uppercase tracking-widest relative transition-colors ${
                      activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea 
                  name={activeTab}
                  value={formData[activeTab]}
                  onChange={handleChange}
                  placeholder={`Provide detailed information about ${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50/80 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Category & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-50">
              <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-gray-50/80 border-none rounded-2xl text-sm font-bold appearance-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
              </div>
              <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location / City</label>
                  <input 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter availability city"
                    className="w-full px-5 py-3.5 bg-gray-50/80 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                  />
              </div>
            </div>
            
            {/* Pricing Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Standard MRP (₹)</h3>
                   <input 
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-5 py-3.5 bg-gray-50/80 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-1">Selling Price (₹)</h3>
                   <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-5 py-3.5 bg-white border-2 border-blue-100 rounded-2xl text-sm font-black text-blue-600 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
            </div>

            {/* Inventory Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-6 border-t border-gray-50">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Product SKU</label>
                  <input 
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="AQ-RO-XX"
                    className="w-full px-5 py-3.5 bg-gray-50/80 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-blue-100 font-mono tracking-widest uppercase"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Initial Inventory</label>
                  <input 
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-5 py-3.5 bg-gray-50/80 border-none rounded-2xl text-sm font-black focus:ring-2 focus:ring-blue-100"
                  />
                </div>
            </div>

          </section>
        </div>
      </div>

      {/* Right Column: Preview & Submit */}
      <div className="lg:col-span-1 space-y-4 sticky top-6 h-fit">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Live Summary</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">           
           <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm font-bold text-gray-400">PRODUCT</span>
                 <span className="text-sm font-black text-gray-900 text-right w-1/2 truncate italic">{formData.name || 'UNNAMED'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm font-bold text-gray-400">CATEGORY</span>
                 <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">{formData.category.toUpperCase()}</span>
              </div>
              
              {/* Variant Preview */}
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm font-bold text-gray-400">VARIANTS</span>
                 <div className="flex -space-x-2.5">
                    {hasVariants ? (
                      colorVariants.length > 0 ? (
                        colorVariants.map(v => (
                          <div 
                            key={v.id} 
                            className="w-7 h-7 rounded-full border-2 border-white shadow-md transition-transform hover:z-10 hover:scale-125 cursor-help" 
                            style={{ backgroundColor: v.color }} 
                            title={v.label}
                          />
                        ))
                      ) : (
                        <span className="text-[10px] font-black text-rose-500">REQUIRED</span>
                      )
                    ) : (
                      <span className="text-[10px] font-black text-emerald-500">STANDARD ONLY</span>
                    )}
                 </div>
              </div>

              <div className="flex justify-between py-4 border-b border-gray-50">
                 <span className="text-sm font-bold text-gray-400">NET PRICE</span>
                 <span className="text-xl font-black text-emerald-600 flex items-center gap-0.5">
                    <span className="text-sm">₹</span>{Number(formData.price).toLocaleString() || '0'}
                 </span>
              </div>
              <div className="flex justify-between py-3">
                 <span className="text-sm font-bold text-gray-400">STATUS</span>
                 <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full uppercase tracking-widest ring-4 ring-emerald-50">Active</span>
              </div>
           </div>

           <button 
             type="submit"
             className="w-full mt-10 bg-primary text-white font-black py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-95 duration-200"
           >
             <Check size={20} />
             CREATE PRODUCT
           </button>
           <p className="text-center text-[10px] font-bold text-gray-400 mt-5 leading-relaxed">
             BY CLICKING ABOVE, THIS PRODUCT WILL BE ADDED TO YOUR CATALOG IMMEDIATELY.
           </p>
        </div>
      </div>
    </form>
  )
}
