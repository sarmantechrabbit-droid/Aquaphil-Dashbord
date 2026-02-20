import { motion } from 'framer-motion'
import StaffAndRoles from '../../components/Users/StaffAndRoles'

export default function Roles() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 
        Note: Staff and Roles are currently combined in StaffAndRoles component 
        as per the component structure requested.
      */}
      <StaffAndRoles />
    </motion.div>
  )
}
