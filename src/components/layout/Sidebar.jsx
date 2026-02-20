import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Package, ShoppingCart, Shield, Wrench,
  MonitorPlay, HeadphonesIcon, Settings, BarChart2, Cpu,
  ChevronDown, FolderOpen, UserCog,
  ClipboardList, RefreshCw, AlertCircle, BadgeDollarSign,
  Calendar, Tag, Bell, Image, BookOpen, MessageSquare,
  TrendingUp, CreditCard, SlidersHorizontal, Layers, Home, X
} from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'
import logo from '../../assets/logo.png'
import logo1 from '../../assets/logo1.png'

import { NavLink, useLocation, Link } from 'react-router-dom'

const navItems = [
  {
    section: 'MAIN MENU',
    items: [
      { key: 'home', label: 'Home', icon: Home, path: '/' },
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    ]
  },
  {
    section: 'DEALER HUB',
    items: [
       { key: 'products', label: 'Products', icon: Package, children: [
          { label: 'Categories', path: '/products/categories', icon: FolderOpen },
          { label: 'Product List', path: '/products/list', icon: Layers },
       ]},
       { key: 'orders', label: 'Orders', icon: ShoppingCart, path: '/orders/list' },
       { key: 'demo', label: 'Demo Bookings', icon: MonitorPlay, path: '/demo/list' },
    ]
  },
  {
    section: 'SERVICES & AMC',
    items: [
       { key: 'amc', label: 'AMC', icon: Shield, children: [
          { label: 'AMC Plans', path: '/amc/plans', icon: ClipboardList },
          { label: 'Subscriptions', path: '/amc/subscriptions', icon: Layers },
          { label: 'Renewals', path: '/amc/renewals', icon: RefreshCw },
          { label: 'Expired', path: '/amc/expired', icon: AlertCircle },
       ]},
       { key: 'services', label: 'Services', icon: Wrench, children: [
          { label: 'Service List', path: '/services/list', icon: ClipboardList },
          { label: 'AMC Services', path: '/services/amc', icon: Shield },
          { label: 'Paid Services', path: '/services/paid', icon: BadgeDollarSign },
       ]},
    ]
  },
  {
      section: 'OPERATIONS',
      items: [
        { key: 'users', label: 'Users', icon: Users, children: [
            { label: 'Customers', path: '/users/customers', icon: UserCog },
            { label: 'Staff', path: '/users/staff', icon: ClipboardList },
            { label: 'Roles', path: '/users/roles', icon: Shield },
        ]},
        { key: 'reports', label: 'Reports', icon: BarChart2, children: [
            { label: 'Sales Report', path: '/reports/sales', icon: TrendingUp },
            { label: 'Payment Report', path: '/reports/payments', icon: CreditCard },
        ]},
        { key: 'support', label: 'Support', icon: HeadphonesIcon, path: '/support/tickets' },
      ]
  },
  {
    section: 'SYSTEM',
    items: [
      { key: 'configurations', label: 'Configurations', icon: Settings, children: [
          { label: 'Coupons', path: '/config/coupons', icon: Tag },
          { label: 'Notifications', path: '/config/notifications', icon: Bell },
          { label: 'Banners', path: '/config/banners', icon: Image },
          { label: 'Blogs', path: '/config/blogs', icon: BookOpen },
          { label: 'Inquiries', path: '/config/inquiries', icon: MessageSquare },
      ]},
      { key: 'system', label: 'System', icon: Cpu, children: [
          { label: 'General', path: '/system/general', icon: Settings },
          { label: 'AMC Settings', path: '/system/amc', icon: Shield },
          { label: 'Service Types', path: '/system/services', icon: SlidersHorizontal },
      ]},
    ]
  }
]


function NavItem({ item, isChild = false }) {
  const { isCollapsed, openMenus, toggleMenu } = useSidebar()
  const location = useLocation()
  const Icon = item.icon
  const isOpen = openMenus[item.key]

  const baseClasses = `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isChild ? 'text-sm py-2.5 pl-11' : 'text-[15px]'}`
  
  const activeClasses = 'bg-white/15 text-white font-semibold'
  const inactiveClasses = 'text-white/70 hover:bg-white/10 hover:text-white font-medium'

  if (!item.children) {
    return (
      <NavLink
        to={item.path}
        title={isCollapsed ? item.label : undefined}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${isCollapsed ? 'justify-center px-2' : ''}`
        }
      >
        <Icon size={isChild ? 18 : 20} className={`shrink-0 ${isChild ? '' : 'stroke-[1.5]'}`} />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
        {isCollapsed && !isChild && (
          <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg border border-white/10">
            {item.label}
          </span>
        )}
      </NavLink>
    )
  }

  const isParentActive = item.children.some((c) => location.pathname === c.path.split('?')[0])

  return (
    <div>
      <button
        onClick={() => !isCollapsed && toggleMenu(item.key)}
        title={isCollapsed ? item.label : undefined}
        className={`w-full ${baseClasses} ${isParentActive ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/10 hover:text-white font-medium'} ${isCollapsed ? 'justify-center px-2' : ''}`}
      >
        <Icon size={20} className="shrink-0 stroke-[1.5]" />
        {!isCollapsed && (
          <>
            <span className="truncate flex-1 text-left">{item.label}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-white/50">
              <ChevronDown size={16} className="shrink-0" />
            </motion.div>
          </>
        )}
        {isCollapsed && (
          <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg border border-white/10">
            {item.label}
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-0.5">
              {item.children.map((child) => (
                <NavItem key={child.path} item={child} isChild={true} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Sidebar() {
  const { isCollapsed, isMobileOpen, setIsMobileOpen, isSidebarVisible, toggleSidebar } = useSidebar()
  const location = useLocation()

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname, setIsMobileOpen])

  if (!isSidebarVisible) return null

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#0f3460] grow-0 shrink-0 flex flex-col overflow-hidden shadow-2xl lg:shadow-none border-r border-white/10`}
        style={{ width: isCollapsed ? 80 : 280 }}
      >
        {/* Logo & Close */}
        <div className="flex items-center justify-between px-6 py-6 shrink-0">
          <Link to="/dashboard" className="flex items-center gap-3">
             <img src={logo1} alt="Aquaphil" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          
          {!isCollapsed && (
            <button 
              onClick={() => window.innerWidth < 1024 ? setIsMobileOpen(false) : toggleSidebar()}
              className="lg:hidden p-2 rounded-lg bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-4 pb-6 space-y-2">
          {navItems.map((section, idx) => (
             <div key={idx}>
                {!isCollapsed && (
                   <div className="px-4 text-[11px] font-bold text-white/40 uppercase tracking-widest mt-6 mb-2">{section.section}</div>
                )}
                <div className="space-y-1">
                   {section.items.map(item => (
                      <NavItem key={item.key} item={item} />
                   ))}
                </div>
             </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl transition-colors">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-semibold">SA</span>
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <p className="text-white text-sm font-bold truncate">Super Admin</p>
                <p className="text-white/50 text-xs truncate">admin@aquaphil.com</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
}
