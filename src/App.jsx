import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext'
import { ProductProvider } from './context/ProductContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <ProductProvider>
          <AppRoutes />
        </ProductProvider>
      </SidebarProvider>
    </BrowserRouter>
  )
}
