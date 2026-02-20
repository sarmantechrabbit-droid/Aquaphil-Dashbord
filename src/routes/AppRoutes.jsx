import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/index'
import Dashboard from '../pages/Dashboard/Dashboard'
import Customers from '../pages/Users/Customers'
import Staff from '../pages/Users/Staff'
import Roles from '../pages/Users/Roles'
import ProductList from '../pages/Products/ProductList'
import AddProduct from '../pages/Products/AddProduct'
import ProductDetails from '../pages/Products/ProductDetails'
import Categories from '../pages/Products/Categories'
import OrderList from '../pages/Orders/OrderList'
import AMCPlans from '../pages/AMC/AMCPlans'
import AMCSubscriptions from '../pages/AMC/AMCSubscriptions'
import AMCRenewals from '../pages/AMC/AMCRenewals'
import AMCExpired from '../pages/AMC/AMCExpired'
import ServiceList from '../pages/Services/ServiceList'
import AMCServices from '../pages/Services/AMCServices'
import PaidServices from '../pages/Services/PaidServices'
import DemoList from '../pages/Demo/DemoList'
import Tickets from '../pages/Support/Tickets'
import Coupons from '../pages/Configurations/Coupons'
import Notifications from '../pages/Configurations/Notifications'
import Banners from '../pages/Configurations/Banners'
import Blogs from '../pages/Configurations/Blogs'
import Inquiries from '../pages/Configurations/Inquiries'
import SalesReport from '../pages/Reports/SalesReport'
import PaymentReport from '../pages/Reports/PaymentReport'
import GeneralSettings from '../pages/System/GeneralSettings'
import AMCSettings from '../pages/System/AMCSettings'
import ServiceTypeSettings from '../pages/System/ServiceTypeSettings'
import Login from '../pages/Auth/Login'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Users */}
        <Route path="/users/customers" element={<Customers />} />
        <Route path="/users/staff" element={<Staff />} />
        <Route path="/users/roles" element={<Roles />} />

        {/* Products */}
        <Route path="/products/list" element={<ProductList />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<AddProduct />} />
        <Route path="/products/view/:id" element={<ProductDetails />} />
        <Route path="/products/categories" element={<Categories />} />

        {/* Orders */}
        <Route path="/orders/list" element={<OrderList />} />

        {/* AMC */}
        <Route path="/amc/plans" element={<AMCPlans />} />
        <Route path="/amc/subscriptions" element={<AMCSubscriptions />} />
        <Route path="/amc/renewals" element={<AMCRenewals />} />
        <Route path="/amc/expired" element={<AMCExpired />} />

        {/* Services */}
        <Route path="/services/list" element={<ServiceList />} />
        <Route path="/services/amc" element={<AMCServices />} />
        <Route path="/services/paid" element={<PaidServices />} />

        {/* Demo */}
        <Route path="/demo/list" element={<DemoList />} />

        {/* Support */}
        <Route path="/support/tickets" element={<Tickets />} />

        {/* Configurations */}
        <Route path="/config/coupons" element={<Coupons />} />
        <Route path="/config/notifications" element={<Notifications />} />
        <Route path="/config/banners" element={<Banners />} />
        <Route path="/config/blogs" element={<Blogs />} />
        <Route path="/config/inquiries" element={<Inquiries />} />

        {/* Reports */}
        <Route path="/reports/sales" element={<SalesReport />} />
        <Route path="/reports/payments" element={<PaymentReport />} />

        {/* System */}
        <Route path="/system/general" element={<GeneralSettings />} />
        <Route path="/system/amc" element={<AMCSettings />} />
        <Route path="/system/services" element={<ServiceTypeSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
