import { createContext, useContext, useState } from 'react'
import { 
  orders as initialOrders, 
  serviceRequests as initialServices,
  amcRenewals as initialRenewals,
  supportTickets as initialTickets,
  demoBookings as initialDemos,
  coupons as initialCoupons,
  banners as initialBanners,
  blogs as initialBlogs,
  inquiries as initialInquiries,
  notifications as initialNotifications
} from '../data/dummyData'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders)
  const [services, setServices] = useState(initialServices)
  const [renewals, setRenewals] = useState(initialRenewals)
  const [tickets, setTickets] = useState(initialTickets)
  const [demos, setDemos] = useState(initialDemos)
  const [coupons, setCoupons] = useState(initialCoupons)
  const [banners, setBanners] = useState(initialBanners)
  const [blogs, setBlogs] = useState(initialBlogs)
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [notifications, setNotifications] = useState(initialNotifications)

  // Orders
  const updateOrder = (id, updates) => setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  const deleteOrder = (id) => setOrders(prev => prev.filter(o => o.id !== id))

  // Services
  const addService = (item) => setServices(prev => [item, ...prev])
  const updateService = (id, updates) => setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  const deleteService = (id) => setServices(prev => prev.filter(s => s.id !== id))

  // Tickets
  const updateTicket = (id, updates) => setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  const deleteTicket = (id) => setTickets(prev => prev.filter(t => t.id !== id))

  // Demos
  const updateDemo = (id, updates) => setDemos(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  const deleteDemo = (id) => setDemos(prev => prev.filter(d => d.id !== id))

  // Coupons
  const addCoupon = (item) => setCoupons(prev => [item, ...prev])
  const deleteCoupon = (id) => setCoupons(prev => prev.filter(c => c.id !== id))

  // Banners
  const addBanner = (item) => setBanners(prev => [item, ...prev])
  const deleteBanner = (id) => setBanners(prev => prev.filter(b => b.id !== id))

  // Blogs
  const addBlog = (item) => setBlogs(prev => [item, ...prev])
  const deleteBlog = (id) => setBlogs(prev => prev.filter(b => b.id !== id))

  // Inquiries
  const deleteInquiry = (id) => setInquiries(prev => prev.filter(i => i.id !== id))

  // Notifications
  const addNotification = (item) => setNotifications(prev => [item, ...prev])
  const deleteNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id))

  const value = {
    orders, updateOrder, deleteOrder,
    services, addService, updateService, deleteService,
    renewals,
    tickets, updateTicket, deleteTicket,
    demos, updateDemo, deleteDemo,
    coupons, addCoupon, deleteCoupon,
    banners, addBanner, deleteBanner,
    blogs, addBlog, deleteBlog,
    inquiries, deleteInquiry,
    notifications, addNotification, deleteNotification
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
