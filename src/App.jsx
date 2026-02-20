import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './context/SidebarContext'
import { ProductProvider } from './context/ProductContext'
import { DataProvider } from './context/DataContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <DataProvider>
          <ProductProvider>
            <AppRoutes />
          </ProductProvider>
        </DataProvider>
      </SidebarProvider>
    </BrowserRouter>
  )
}
