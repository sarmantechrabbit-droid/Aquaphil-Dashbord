import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useSidebar } from '../../context/SidebarContext'

export default function Layout() {
  const location = useLocation()
  const { isTopbarVisible } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-light)' }}>
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AnimatePresence>
          {isTopbarVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="shrink-0"
            >
              <Topbar />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className=" mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
