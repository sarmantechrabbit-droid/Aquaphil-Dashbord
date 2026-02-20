import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [isTopbarVisible, setIsTopbarVisible] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState({})

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev)
  const toggleTopbar = () => setIsTopbarVisible((prev) => !prev)
  const toggleCollapse = () => setIsCollapsed((prev) => !prev)
  const toggleMobile = () => setIsMobileOpen((prev) => !prev)

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }))
  }

  return (
    <SidebarContext.Provider value={{ 
      isSidebarVisible, toggleSidebar,
      isTopbarVisible, toggleTopbar,
      isCollapsed, toggleCollapse, 
      isMobileOpen, setIsMobileOpen, toggleMobile,
      openMenus, toggleMenu 
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
