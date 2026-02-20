import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Star, Share2, Heart, Truck, Package, 
  Minus, Plus, ChevronRight, ShieldCheck, RefreshCw 
} from 'lucide-react'
import { useProducts } from '../../context/ProductContext'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  
  const [product, setProduct] = useState(null)
  const [activeVariant, setActiveVariant] = useState(null)
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [selectedCapacity, setSelectedCapacity] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [openSection, setOpenSection] = useState('desc')

  useEffect(() => {
    const found = products.find(p => p.id === id)
    if (found) {
      setProduct(found)
      setActiveVariant(found.colorVariants?.[0] || null)
      setSelectedCapacity(found.capacities?.[0] || null)
    }
  }, [id, products])

  if (!product) return <div className="p-8 text-center text-gray-500">Loading product...</div>

  // Generate some helper data if missing
  const images = activeVariant?.images?.length > 0 ? activeVariant.images : ['https://via.placeholder.com/600x600?text=No+Image']
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className=" mx-auto pb-12"
    >
      {/* Breadcrumb / Back */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/products/list')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={18} />
          Back to Products
        </button>
        <div className="flex gap-3">
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Images (7 cols) - BOXED */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full flex flex-col md:flex-row gap-6">
            {/* Thumbnails Vertical List */}
            <div className="hidden md:flex flex-col gap-4 w-20 shrink-0">
              {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx 
                        ? 'border-[#0f3460] ring-2 ring-[#0f3460]/10' 
                        : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 rounded-2xl bg-gray-50 relative overflow-hidden group min-h-[400px]">
              <img 
                src={images[activeImageIdx]} 
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" 
              />
              <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg text-gray-500 hover:text-gray-900">
                  <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Info (5 cols) - BOXED */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
            
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-[#0f3460] leading-tight">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < (product.rating || 5) ? "currentColor" : "none"} className={i >= (product.rating || 5) ? "text-gray-300" : ""} />
                      ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.reviewsCount || 0} reviews</span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-[#0f3460]">₹{(product.price).toLocaleString()}</span>
                {product.mrp > product.price && (
                  <span className="text-lg text-gray-400 line-through decoration-red-400 decoration-2">₹{(product.mrp).toLocaleString()}</span>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description || "Advanced water purification system tailored for modern homes. Ensures clean, mineral-rich water with every glass."}
            </p>

            {/* Shipping Info Box (Inside Info Card) */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="text-[#0f3460] mt-0.5" size={20} />
                  <div>
                      <h4 className="text-sm font-bold text-gray-900">Free Shipping & Returns</h4>
                      <p className="text-xs text-gray-500">On all orders over ₹2000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-3 border-t border-gray-200/50">
                  <Package className="text-[#0f3460] mt-0.5" size={20} />
                  <div>
                      <h4 className="text-sm font-bold text-gray-900">Estimated Delivery</h4>
                      <p className="text-xs text-gray-500 font-medium">3-5 days in Main Cities</p>
                  </div>
                </div>
            </div>

            {/* Color Variant Selector */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <div className="space-y-3">
                  <span className="text-sm font-bold text-gray-900">Color: <span className="font-normal text-gray-600">{activeVariant?.label}</span></span>
                  <div className="flex gap-3">
                    {product.colorVariants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => { setActiveVariant(v); setActiveImageIdx(0); }}
                          className={`w-14 h-14 rounded-lg border-2 p-0.5 transition-all ${
                            activeVariant?.id === v.id ? 'border-[#0f3460]' : 'border-transparent hover:border-gray-200'
                          }`}
                          title={v.label}
                        >
                          <div className="w-full h-full rounded shadow-sm overflow-hidden bg-gray-100 relative">
                              {v.images?.[0] ? (
                                <img src={v.images[0]} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full" style={{ backgroundColor: v.color }} />
                              )}
                          </div>
                        </button>
                    ))}
                  </div>
              </div>
            )}

            {/* Capacity Selector */}
            {product.capacities && product.capacities.length > 0 && (
              <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">Storage Tank Capacity: <span className="font-normal text-gray-600">{selectedCapacity}</span></span>
                    <button className="text-xs underline text-gray-500 hover:text-gray-900">Size guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.capacities.map((cap) => (
                        <button
                          key={cap}
                          onClick={() => setSelectedCapacity(cap)}
                          className={`px-4 py-2 text-sm font-medium border rounded-lg transition-all ${
                            selectedCapacity === cap 
                              ? 'bg-[#0f3460] text-white border-[#0f3460] shadow-md' 
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {cap}
                        </button>
                    ))}
                  </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                      <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                      <Plus size={16} />
                  </button>
                </div>
                
                <button className="flex-1 py-3 border-2 border-[#0f3460] text-[#0f3460] font-bold rounded-xl hover:bg-blue-50 transition-colors bg-white">
                  Add to Cart
                </button>

                <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
                  <Heart size={20} />
                </button>
            </div>
            
            <button className="w-full py-3.5 bg-[#0f3460] text-white font-bold rounded-xl hover:bg-[#1a4b8c] transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                Buy it now
            </button>
            
            {/* Accordions (Inside Info Card) */}
            <div className="pt-6 border-t border-gray-100 space-y-1">
                {[
                  { id: 'desc', label: 'Description', icon: null, content: product.description },
                  { id: 'ship', label: 'Shipping and Returns', icon: null, content: product.shippingReturns || "Standard shipping applies." },
                  { id: 'ret', label: 'Return Policies', icon: null, content: product.returnPolicies || "Items must be returned in original condition." }
                ].map((item) => (
                  <div key={item.id} className="border-b border-gray-100 last:border-0">
                    <button 
                      onClick={() => setOpenSection(openSection === item.id ? null : item.id)}
                      className="w-full py-4 flex items-center justify-between group"
                    >
                      <span className="text-sm font-bold text-gray-900">{item.label}</span>
                      {openSection === item.id ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openSection === item.id ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        {item.content || "No details available."}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}
