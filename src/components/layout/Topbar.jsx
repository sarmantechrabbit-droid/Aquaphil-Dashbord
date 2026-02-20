import { useState, useEffect } from 'react'
import { useLocation, Link, NavLink } from 'react-router-dom'
import { 
  Menu, Search, Bell, ChevronDown, LayoutDashboard, Home, X,
  Users, Package, ShoppingCart, Shield, Wrench, MonitorPlay, 
  HeadphonesIcon, Settings, BarChart2, Cpu, UserCog, ClipboardList,
  FolderOpen, Layers, RefreshCw, AlertCircle, BadgeDollarSign,
  Tag, Image, BookOpen, MessageSquare, TrendingUp, CreditCard,
  SlidersHorizontal, MoreVertical, LogOut
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logo.png'
import { useSidebar } from '../../context/SidebarContext'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  {
    key: 'users',
    label: 'Users',
    icon: Users,
    children: [
      { label: 'Customers', path: '/users/customers', icon: UserCog },
      { label: 'Staff', path: '/users/staff', icon: ClipboardList },
      { label: 'Roles', path: '/users/roles', icon: Shield },
    ],
  },
  {
    key: 'products',
    label: 'Products',
    icon: Package,
    children: [
      { label: 'Categories', path: '/products/categories', icon: FolderOpen },
      { label: 'Product List', path: '/products/list', icon: Layers },
    ],
  },
  { key: 'orders', label: 'Orders', icon: ShoppingCart, path: '/orders/list' },
  {
    key: 'amc',
    label: 'AMC',
    icon: Shield,
    children: [
      { label: 'AMC Plans', path: '/amc/plans', icon: ClipboardList },
      { label: 'Subscriptions', path: '/amc/subscriptions', icon: Layers },
      { label: 'Renewals', path: '/amc/renewals', icon: RefreshCw },
      { label: 'Expired', path: '/amc/expired', icon: AlertCircle },
    ]
  },
  {
    key: 'services',
    label: 'Services',
    icon: Wrench,
    children: [
      { label: 'Service List', path: '/services/list', icon: ClipboardList },
      { label: 'AMC Services', path: '/services/amc', icon: Shield },
      { label: 'Paid Services', path: '/services/paid', icon: BadgeDollarSign },
    ]
  },
  { key: 'demo', label: 'Demos', icon: MonitorPlay, path: '/demo/list' },
  { key: 'support', label: 'Support', icon: HeadphonesIcon, path: '/support/tickets' },
  {
    key: 'more',
    label: 'More',
    icon: SlidersHorizontal,
    children: [
      { label: 'Coupons', path: '/config/coupons', icon: Tag },
      { label: 'Notifications', path: '/config/notifications', icon: Bell },
      { label: 'Banners', path: '/config/banners', icon: Image },
      { label: 'Blogs', path: '/config/blogs', icon: BookOpen },
      { label: 'Reports', path: '/reports/sales', icon: BarChart2 },
      { label: 'System', path: '/system/general', icon: Cpu },
    ]
  }
]

function DesktopNav() {
  const [activeMenu, setActiveMenu] = useState(null)
  const location = useLocation()

  return (
    <nav className="hidden xl:flex items-center gap-1 mx-6 h-full">
      {navItems.map((item) => {
        const Icon = item.icon
        const hasChildren = !!item.children
        const isActive = item.path ? location.pathname === item.path : item.children?.some(c => location.pathname === c.path)

        return (
          <div 
            key={item.key} 
            className="relative h-full flex items-center"
            onMouseEnter={() => hasChildren && setActiveMenu(item.key)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {item.path ? (
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                  ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}
                `}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ) : (
              <button className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}
              `}>
                <Icon size={16} />
                <span>{item.label}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.key ? 'rotate-180' : ''}`} />
              </button>
            )}

            <AnimatePresence>
              {hasChildren && activeMenu === item.key && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 min-w-[200px] pt-2 z-[100]"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all
                            ${isActive ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}
                          `}
                        >
                          <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                            <ChildIcon size={14} />
                          </div>
                          <span className="truncate">{child.label}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}

export default function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()

  const { isSidebarVisible, toggleSidebar, toggleTopbar } = useSidebar()

  // Generate Breadcrumbs from location
  const pathnames = location.pathname.split('/').filter((x) => x)
  const breadcrumbs = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
    return { name: name.charAt(0).toUpperCase() + name.slice(1), path: routeTo }
  })

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className="sticky top-0 z-90 h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between shadow-sm">
        {/* Left Section: Dynamic Content (Mode 1 vs Mode 2) */}
        <div className="flex items-center gap-6">
          {isSidebarVisible ? (
            // Sidebar is Visible: Show Hamburger + Breadcrumbs (Image 1)
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
              >
                <Menu size={20} />
              </button>
              
              <div className="hidden sm:flex flex-col">
                <h1 className="text-sm font-bold text-gray-900 leading-tight">
                  {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : 'Dashboard'}
                </h1>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
                  <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
                  {breadcrumbs.map((bc, i) => (
                    <div key={bc.path} className="flex items-center gap-1.5">
                      <ChevronDown size={10} className="-rotate-90 opacity-40" />
                      <span className={i === breadcrumbs.length - 1 ? 'text-gray-600 font-semibold' : 'hover:text-primary cursor-pointer transition-colors'}>
                        {bc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Sidebar is Hidden: Show Logo + Desktop Nav (Image 2)
            <div className="flex items-center gap-6 h-full">
              <Link 
                to="/dashboard" 
                onClick={(e) => {
                  if (!isSidebarVisible) {
                    toggleSidebar()
                  }
                }}
                className="flex items-center gap-2 mr-4 group cursor-pointer"
              >
                <img src={logo} alt="Aquaphil" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
              </Link>
              <DesktopNav />
            </div>
          )}
        </div>

        {/* Right Section: Universal Tools & User (Image 3) */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-1.5 w-64 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder:text-gray-400 font-medium" 
            />
          </div>

          <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-50 transition-all active:scale-95">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* <button 
            onClick={toggleTopbar}
            className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-primary/5 transition-all active:scale-95"
            title="Toggle Topbar Height"
          >
            <MoreVertical size={20} />
          </button> */}

          {/* Revamped User Profile (Image 3) */}
          <div className="relative">
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 pl-4 border-l border-gray-100 group transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0f3460] flex items-center justify-center shadow-lg shadow-[#0f3460]/20 overflow-hidden ring-2 ring-white group-hover:ring-[#0f3460]/10 transition-all">
                <span className="text-white text-xs font-bold tracking-tight">SA</span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900 leading-none">Super Admin</p>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Premium Plan</p>
              </div>
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setUserMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-[125%] right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50"
                  >
                    {[
                      { label: 'View Profile', icon: UserCog, path: '/profile' },
                      { label: 'Billing & Plans', icon: CreditCard, path: '/billing' },
                      { label: 'Account Settings', icon: Settings, path: '/system/general' },
                      { label: 'Logout', icon: LogOut, path: '/login', danger: true },
                    ].map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        onClick={() => setUserMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          item.danger ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.danger ? 'bg-red-50' : 'bg-gray-50'}`}>
                          <item.icon size={16} />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-110 xl:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-120 xl:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <img src={logo} alt="Aquaphil" className="h-8 w-auto" />
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.key}>
                    {item.path ? (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                          ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}
                        `}
                      >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </NavLink>
                    ) : (
                      <div className="py-2">
                        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4">{item.label}</p>
                        <div className="space-y-1">
                          {item.children.map(child => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                                ${isActive ? 'text-primary bg-primary/5' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}
                              `}
                            >
                              <child.icon size={16} />
                              <span>{child.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
