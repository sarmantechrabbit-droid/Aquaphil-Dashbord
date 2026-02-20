import { useState, useRef } from 'react'
import { Upload, X, ChevronDown, Check, Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { categories } from '../../data/dummyData'

export default function AddProductForm({ onSubmit }) {
  const navigate = useNavigate()
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
  })
  
  // Initialize with one default variant
  const [colorVariants, setColorVariants] = useState([
    { id: Date.now().toString(), color: '#FFFFFF', label: 'Standard', images: [] }
  ])
  
  const [activeTab, setActiveTab] = useState('description')
  
  const fileInputRefs = useRef({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Variant Management
  const addVariant = () => {
    setColorVariants(prev => [
      ...prev,
      { id: Date.now().toString(), color: '#000000', label: 'NeW Color', images: [] }
    ])
  }

  const removeVariant = (id) => {
    if (colorVariants.length === 1) return // Prevent removing the last variant
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
    const newProduct = {
      ...formData,
      mrp: Number(formData.mrp),
      price: Number(formData.price),
      stock: Number(formData.stock),
      colorVariants: colorVariants
    }
    onSubmit(newProduct)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Input Fields */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Card 1: Product Media (Color & Images) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Product Media
            </h3>
            
            {/* Color Variants Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Color & Images</label>
                  <button 
                    type="button"
                    onClick={addVariant}
                    className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Color Variant
                  </button>
              </div>

              <div className="space-y-6">
                  <AnimatePresence>
                    {colorVariants.map((variant) => (
                      <motion.div 
                        key={variant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-5 rounded-2xl border border-gray-200 bg-gray-50/30 relative group hover:border-blue-200 transition-all"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Color Code</label>
                              <div className="flex gap-2">
                                  <input 
                                    type="color" 
                                    value={variant.color} 
                                    onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                                    className="w-11 h-10 p-1 rounded-xl border-none bg-white shadow-sm cursor-pointer"
                                  />
                                  <input 
                                    type="text" 
                                    value={variant.color} 
                                    onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                                    className="flex-1 px-3 py-2 text-xs border-none bg-white rounded-xl shadow-sm font-mono uppercase focus:ring-2 focus:ring-blue-100"
                                    placeholder="#FFFFFF"
                                  />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Color Name</label>
                              <input 
                                type="text" 
                                value={variant.label} 
                                onChange={(e) => updateVariant(variant.id, 'label', e.target.value)}
                                className="w-full px-3 py-2.5 text-xs border-none bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-blue-100"
                                placeholder="e.g. Arctic White"
                              />
                            </div>
                        </div>

                        {/* Image Upload Area for Variant */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Variant Images</label>
                            <div className="flex flex-wrap gap-3">
                              {variant.images.map((img, imgIdx) => (
                                <div key={imgIdx} className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm group/img bg-white">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <button 
                                      type="button"
                                      onClick={() => removeVariantImage(variant.id, imgIdx)}
                                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity transform scale-75"
                                    >
                                      <X size={12} />
                                    </button>
                                </div>
                              ))}
                              
                              <label 
                                className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 cursor-pointer bg-white transition-all hover:shadow-md"
                              >
                                  <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    className="hidden"
                                    onChange={(e) => handleVariantImageChange(variant.id, e)}
                                  />
                                  <Upload size={18} className="mb-1" />
                                  <span className="text-[8px] font-bold uppercase">Add</span>
                              </label>
                            </div>
                        </div>

                        {colorVariants.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => removeVariant(variant.id)}
                              className="absolute -top-3 -right-3 p-2 bg-white text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
              </div>
            </div>
        </div>

        {/* Card 2: Product Name & Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Product Details
            </h3>
            
            <section className="space-y-8">
            
            {/* Product Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Product Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sony WH-1000XM5 Headphones"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Product Details Tabs (Description, etc) */}
            <div className="space-y-4">
              <div className="flex gap-6 border-b border-gray-100">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'shippingReturns', label: 'Shipping & Returns' },
                  { id: 'returnPolicies', label: 'Return Policies' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-xs font-bold uppercase tracking-widest relative transition-colors ${
                      activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
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
                  placeholder={`Enter product ${activeTab.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Category & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                  <div className="relative">
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium appearance-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
              </div>
              <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">City</label>
                  <input 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                  />
              </div>
            </div>
            
            {/* Pricing Details */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Pricing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Original Price (?)</label>
                  <input 
                    type="number"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Selling Price (?)</label>
                  <input 
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Inventory Settings */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Inventory Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">SKU Code</label>
                  <input 
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g. AQ-RO-001"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Stock Quantity</label>
                  <input 
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>

      {/* Right Column: Preview & Submit */}
      <div className="lg:col-span-1 space-y-4 sticky top-6 h-fit">
        <h3 className="text-sm font-bold text-gray-900">Values Preview</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">           
           <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm text-gray-500">Product</span>
                 <span className="text-sm font-medium text-gray-900 text-right w-1/2 truncate">{formData.name || '-'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm text-gray-500">Category</span>
                 <span className="text-sm font-medium text-gray-900">{formData.category}</span>
              </div>
              
              {/* Variant Preview */}
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm text-gray-500">Colors</span>
                 <div className="flex -space-x-2">
                    {colorVariants.map(v => (
                       <div 
                         key={v.id} 
                         className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                         style={{ backgroundColor: v.color }} 
                         title={v.label}
                       />
                    ))}
                 </div>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm text-gray-500">Price</span>
                 <span className="text-sm font-bold text-green-600">?{formData.price || '0'}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-50">
                 <span className="text-sm text-gray-500">Status</span>
                 <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase">Active</span>
              </div>
           </div>

           <button 
             type="submit"
             className="w-full mt-8 bg-[#3d5a80] text-white font-bold py-3.5 rounded-xl hover:bg-[#2e4566] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-95 duration-200"
           >
             <Check size={18} />
             Submit Product
           </button>
           <p className="text-center text-xs text-gray-400 mt-3">Product will be added immediately</p>
        </div>
      </div>
    </form>
  )
}
