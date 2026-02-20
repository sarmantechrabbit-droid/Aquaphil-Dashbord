// =============================================
// AQUAPHIL ADMIN DASHBOARD — DUMMY DATA
// =============================================

export const stats = [
  { id: 1, label: 'Total Customers', value: '1,284', icon: 'Users', delta: '+12%', positive: true, color: 'blue' },
  { id: 2, label: 'Active AMCs', value: '342', icon: 'ShieldCheck', delta: '+4%', positive: true, color: 'green' },
  { id: 3, label: 'Pending Services', value: '28', icon: 'Wrench', delta: '-3', positive: false, color: 'orange' },
  { id: 4, label: 'Open Tickets', value: '15', icon: 'Headphones', delta: '+2', positive: false, color: 'red' },
  { id: 5, label: 'Orders Today', value: '47', icon: 'ShoppingCart', delta: '+8%', positive: true, color: 'purple' },
  { id: 6, label: 'Revenue (MTD)', value: '₹2.4L', icon: 'IndianRupee', delta: '+18%', positive: true, color: 'teal' },
]

// =============================================
// CUSTOMERS
// =============================================
export const customers = [
  { id: 'CUST001', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 98765 43210', city: 'Mumbai', state: 'Maharashtra', status: 'active', joinedDate: '2024-01-15', totalOrders: 4, products: 4, amcActive: true, totalSpend: 24500 },
  { id: 'CUST002', name: 'Sunita Verma', email: 'sunita.v@email.com', phone: '+91 91234 56789', city: 'Delhi', state: 'Delhi', status: 'active', joinedDate: '2024-02-20', totalOrders: 2, products: 2, amcActive: true, totalSpend: 12400 },
  { id: 'CUST003', name: 'Anita Desai', email: 'anita.desai@email.com', phone: '+91 88765 43210', city: 'Ahmedabad', state: 'Gujarat', status: 'active', joinedDate: '2024-03-10', totalOrders: 3, products: 3, amcActive: false, totalSpend: 8900 },
  { id: 'CUST004', name: 'Manoj Tiwari', email: 'manoj.t@email.com', phone: '+91 77654 32109', city: 'Lucknow', state: 'UP', status: 'inactive', joinedDate: '2024-03-22', totalOrders: 1, products: 1, amcActive: false, totalSpend: 299 },
  { id: 'CUST005', name: 'Kavita Sharma', email: 'kavita.s@email.com', phone: '+91 99876 54321', city: 'Jaipur', state: 'Rajasthan', status: 'active', joinedDate: '2024-04-05', totalOrders: 5, products: 5, amcActive: true, totalSpend: 31200 },
  { id: 'CUST006', name: 'Rohit Patel', email: 'rohit.p@email.com', phone: '+91 87654 32190', city: 'Surat', state: 'Gujarat', status: 'active', joinedDate: '2024-04-18', totalOrders: 2, products: 2, amcActive: true, totalSpend: 9800 },
  { id: 'CUST007', name: 'Meena Patel', email: 'meena.patel@email.com', phone: '+91 76543 21098', city: 'Vadodara', state: 'Gujarat', status: 'suspended', joinedDate: '2024-05-01', totalOrders: 3, products: 3, amcActive: false, totalSpend: 4500 },
  { id: 'CUST008', name: 'Arun Nair', email: 'arun.nair@email.com', phone: '+91 98654 32107', city: 'Kochi', state: 'Kerala', status: 'active', joinedDate: '2024-05-12', totalOrders: 6, products: 6, amcActive: true, totalSpend: 42000 },
  { id: 'CUST009', name: 'Deepa Menon', email: 'deepa.menon@email.com', phone: '+91 89765 43201', city: 'Thiruvananthapuram', state: 'Kerala', status: 'active', joinedDate: '2024-06-03', totalOrders: 2, products: 2, amcActive: false, totalSpend: 7500 },
  { id: 'CUST010', name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91 87654 32109', city: 'Pune', state: 'Maharashtra', status: 'active', joinedDate: '2024-06-20', totalOrders: 1, products: 1, amcActive: false, totalSpend: 12000 },
  { id: 'CUST011', name: 'Priya Joshi', email: 'priya.joshi@email.com', phone: '+91 99234 56781', city: 'Nagpur', state: 'Maharashtra', status: 'active', joinedDate: '2024-07-08', totalOrders: 4, products: 4, amcActive: true, totalSpend: 15600 },
  { id: 'CUST012', name: 'Suresh Reddy', email: 'suresh.r@email.com', phone: '+91 78901 23456', city: 'Hyderabad', state: 'Telangana', status: 'active', joinedDate: '2024-07-25', totalOrders: 3, products: 3, amcActive: true, totalSpend: 19800 },
  { id: 'CUST013', name: 'Lakshmi Iyer', email: 'lakshmi.i@email.com', phone: '+91 96789 01234', city: 'Chennai', state: 'Tamil Nadu', status: 'inactive', joinedDate: '2024-08-14', totalOrders: 2, products: 2, amcActive: false, totalSpend: 8400 },
  { id: 'CUST014', name: 'Kiran Rao', email: 'kiran.rao@email.com', phone: '+91 91234 67890', city: 'Bengaluru', state: 'Karnataka', status: 'active', joinedDate: '2024-09-01', totalOrders: 7, products: 7, amcActive: true, totalSpend: 56000 },
  { id: 'CUST015', name: 'Neha Gupta', email: 'neha.g@email.com', phone: '+91 80123 45678', city: 'Bhopal', state: 'MP', status: 'active', joinedDate: '2024-09-19', totalOrders: 2, products: 2, amcActive: false, totalSpend: 9200 },
]

// =============================================
// STAFF
// =============================================
export const staff = [
  { id: 'STAFF001', name: 'Priya Sharma', email: 'priya@aquaphil.com', phone: '+91 99001 23456', role: 'admin', department: 'Operations', status: 'active', joinedDate: '2023-03-10', lastLogin: '2026-02-19' },
  { id: 'STAFF002', name: 'Rahul Mehta', email: 'rahul@aquaphil.com', phone: '+91 99002 34567', role: 'manager', department: 'Sales', status: 'active', joinedDate: '2023-05-15', lastLogin: '2026-02-18' },
  { id: 'STAFF003', name: 'Suresh Kumar', email: 'suresh@aquaphil.com', phone: '+91 99003 45678', role: 'technician', department: 'Service', status: 'active', joinedDate: '2023-07-20', lastLogin: '2026-02-17' },
  { id: 'STAFF004', name: 'Ananya Singh', email: 'ananya@aquaphil.com', phone: '+91 99004 56789', role: 'support', department: 'Customer Support', status: 'active', joinedDate: '2023-09-01', lastLogin: '2026-02-19' },
  { id: 'STAFF005', name: 'Mohan Das', email: 'mohan@aquaphil.com', phone: '+91 99005 67890', role: 'technician', department: 'Service', status: 'inactive', joinedDate: '2023-11-12', lastLogin: '2026-01-30' },
  { id: 'STAFF006', name: 'Divya Nair', email: 'divya@aquaphil.com', phone: '+91 99006 78901', role: 'manager', department: 'Marketing', status: 'active', joinedDate: '2024-01-08', lastLogin: '2026-02-18' },
  { id: 'STAFF007', name: 'Ajay Gupta', email: 'ajay@aquaphil.com', phone: '+91 99007 89012', role: 'support', department: 'Customer Support', status: 'active', joinedDate: '2024-03-22', lastLogin: '2026-02-19' },
  { id: 'STAFF008', name: 'Sneha Rao', email: 'sneha@aquaphil.com', phone: '+91 99008 90123', role: 'technician', department: 'Service', status: 'active', joinedDate: '2024-06-10', lastLogin: '2026-02-16' },
]

export const roles = [
  { id: 'ROLE001', name: 'Admin', permissions: ['dashboard', 'users', 'products', 'orders', 'amc', 'services', 'demo', 'support', 'configurations', 'reports', 'system'], userCount: 2 },
  { id: 'ROLE002', name: 'Manager', permissions: ['dashboard', 'users', 'products', 'orders', 'amc', 'services', 'demo', 'support', 'reports'], userCount: 2 },
  { id: 'ROLE003', name: 'Technician', permissions: ['dashboard', 'services', 'amc'], userCount: 3 },
  { id: 'ROLE004', name: 'Support Agent', permissions: ['dashboard', 'support', 'users'], userCount: 2 },
]

// =============================================
// CATEGORIES & PRODUCTS
// =============================================
export const categories = [
  { id: 'CAT001', name: 'Water Purifiers', productCount: 24, status: 'active', createdDate: '2023-01-10' },
  { id: 'CAT002', name: 'Filters & Cartridges', productCount: 56, status: 'active', createdDate: '2023-01-10' },
  { id: 'CAT003', name: 'UV Sterilizers', productCount: 12, status: 'active', createdDate: '2023-02-15' },
  { id: 'CAT004', name: 'Water Softeners', productCount: 8, status: 'active', createdDate: '2023-04-20' },
  { id: 'CAT005', name: 'Accessories', productCount: 34, status: 'active', createdDate: '2023-06-05' },
  { id: 'CAT006', name: 'Commercial Systems', productCount: 7, status: 'inactive', createdDate: '2023-08-12' },
]

export const products = [
  { 
    id: 'PROD001', 
    name: 'Aquaphil Glam', 
    category: 'Water Purifiers', 
    sku: 'AP-GLAM-01', 
    mrp: 15999, 
    price: 12999, 
    stock: 45, 
    sold: 120, 
    status: 'active', 
    amcEligible: true, 
    rating: 4.8,
    reviewsCount: 3,
    description: 'Advanced RO Water Purifier with Alkaline, Zinc & Copper Filtration. Purifies up to 9000 L with enhanced mineral balance and superior contaminant removal.',
    capacities: ['4.9 L', '5.9 L', '13.9 L', '14 L'],
    colorVariants: [
      {
        id: 'v1',
        color: '#2D2D2D',
        label: 'Black',
        images: [
          'https://images.unsplash.com/photo-1585846430480-0a8616110f88?q=80&w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop'
        ]
      },
      {
        id: 'v2',
        color: '#FFFFFF',
        label: 'White',
        images: [
          'https://images.unsplash.com/photo-1544787210-24430cf7f02b?q=80&w=400&h=400&fit=crop',
          'https://images.unsplash.com/photo-1626084300762-5f7a34632424?q=80&w=400&h=400&fit=crop'
        ]
      },
      {
        id: 'v3',
        color: '#4A0E0E',
        label: 'Maroon',
        images: [
          'https://images.unsplash.com/photo-1585846430480-0a8616110f88?q=80&w=400&h=400&fit=crop'
        ]
      },
      {
        id: 'v4',
        color: '#1A237E',
        label: 'Blue',
        images: [
          'https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop'
        ]
      }
    ]
  },
  { 
    id: 'PROD002', 
    name: 'AquaPure RO 5-Stage', 
    category: 'Water Purifiers', 
    sku: 'AP-RO-5S', 
    mrp: 11999, 
    price: 9499, 
    stock: 30, 
    sold: 85, 
    status: 'active', 
    amcEligible: true, 
    rating: 4.3,
    reviewsCount: 8,
    description: 'Efficient 5-stage purification system designed for households with moderate TDS levels. Compact and reliable.',
    capacities: ['4.9 L', '5.9 L'],
    colorVariants: [
      {
        id: 'v1',
        color: '#2D2D2D',
        label: 'Black',
        images: ['https://images.unsplash.com/photo-1544787210-24430cf7f02b?q=80&w=400&h=400&fit=crop']
      },
      {
        id: 'v2',
        color: '#FFFFFF',
        label: 'White',
        images: ['https://images.unsplash.com/photo-1585846430480-0a8616110f88?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  // ... rest of products simplified for now or kept as is if possible
  { 
    id: 'PROD003', 
    name: 'Crystal UV Purifier', 
    category: 'UV Sterilizers', 
    sku: 'CRY-UV-01', 
    mrp: 8499, 
    price: 6999, 
    stock: 20, 
    sold: 42, 
    status: 'active', 
    amcEligible: true, 
    rating: 4.1,
    reviewsCount: 15,
    description: 'Powerful UV sterilizer that eliminates 99.9% of bacteria and viruses.',
    capacities: ['7 L'],
    colorVariants: [
      {
        id: 'v1',
        color: '#FFFFFF',
        label: 'White',
        images: ['https://images.unsplash.com/photo-1626084300762-5f7a34632424?q=80&w=400&h=400&fit=crop']
      },
      {
        id: 'v2',
        color: '#1A237E',
        label: 'Blue',
        images: ['https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD004', 
    name: 'AquaSoft Water Softener', 
    category: 'Water Softeners', 
    sku: 'AS-WS-PRO', 
    mrp: 22000, 
    price: 18500, 
    stock: 8, 
    sold: 15, 
    status: 'active', 
    amcEligible: true, 
    rating: 4.6,
    reviewsCount: 5,
    description: 'Whole-house water softener that protects your appliances and skin from the harmful effects of hard water.',
    capacities: ['20 L', '50 L'],
    colorVariants: [
      {
        id: 'v1',
        color: '#2D2D2D',
        label: 'Black',
        images: ['https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD005', 
    name: 'Sediment Filter 10"', 
    category: 'Filters & Cartridges', 
    sku: 'FLT-SED-10', 
    mrp: 499, 
    price: 299, 
    stock: 250, 
    sold: 450, 
    status: 'active', 
    amcEligible: false, 
    rating: 4.4,
    reviewsCount: 200,
    description: 'High-quality 10-inch sediment filter for removing sand, silt, and rust from your water supply.',
    capacities: ['N/A'],
    colorVariants: [
      {
        id: 'v1',
        color: '#FFFFFF',
        label: 'White',
        images: ['https://images.unsplash.com/photo-1626084300762-5f7a34632424?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD006', 
    name: 'Carbon Block Filter', 
    category: 'Filters & Cartridges', 
    sku: 'FLT-CB-01', 
    mrp: 599, 
    price: 399, 
    stock: 180, 
    sold: 320, 
    status: 'active', 
    amcEligible: false, 
    rating: 4.2,
    reviewsCount: 150,
    description: 'Activated carbon block filter for removing chlorine, bad taste, and odor from water.',
    capacities: ['N/A'],
    colorVariants: [
      {
        id: 'v1',
        color: '#FFFFFF',
        label: 'White',
        images: ['https://images.unsplash.com/photo-1585846430480-0a8616110f88?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD007', 
    name: 'RO Membrane 75 GPD', 
    category: 'Filters & Cartridges', 
    sku: 'FLT-ROM-75', 
    mrp: 1299, 
    price: 899, 
    stock: 120, 
    sold: 210, 
    status: 'active', 
    amcEligible: false, 
    rating: 4.5,
    reviewsCount: 95,
    description: 'High-performance RO membrane with 75 GPD capacity for pure and safe drinking water.',
    capacities: ['75 GPD'],
    colorVariants: [
      {
        id: 'v1',
        color: '#1A237E',
        label: 'Blue',
        images: ['https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD008', 
    name: 'AquaPure Commercial 100LPH', 
    category: 'Commercial Systems', 
    sku: 'COM-100LPH', 
    mrp: 95000, 
    price: 85000, 
    stock: 3, 
    sold: 8, 
    status: 'active', 
    amcEligible: true, 
    rating: 4.7,
    reviewsCount: 3,
    description: 'Robust commercial RO system with 100 liters per hour capacity, ideal for offices and restaurants.',
    capacities: ['100 LPH'],
    colorVariants: [
      {
        id: 'v1',
        color: '#FFFFFF',
        label: 'White',
        images: ['https://images.unsplash.com/photo-1544787210-24430cf7f02b?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD009', 
    name: 'Filter Housing 10"', 
    category: 'Accessories', 
    sku: 'ACC-FH-10', 
    mrp: 649, 
    price: 449, 
    stock: 90, 
    sold: 65, 
    status: 'active', 
    amcEligible: false, 
    rating: 4.0,
    reviewsCount: 40,
    description: 'Durable 10-inch filter housing for standard water filter cartridges.',
    capacities: ['10"'],
    colorVariants: [
      {
        id: 'v1',
        color: '#FFFFFF',
        label: 'White',
        images: ['https://images.unsplash.com/photo-1585846430480-0a8616110f88?q=80&w=400&h=400&fit=crop']
      },
      {
        id: 'v2',
        color: '#1A237E',
        label: 'Blue',
        images: ['https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
  { 
    id: 'PROD010', 
    name: 'AquaPure RO 9-Stage Premium', 
    category: 'Water Purifiers', 
    sku: 'AP-RO-9S', 
    mrp: 22999, 
    price: 17999, 
    stock: 0, 
    sold: 24, 
    status: 'out_of_stock', 
    amcEligible: true, 
    rating: 4.8,
    reviewsCount: 25,
    description: 'Our top-of-the-line RO purifier with 9 stages of filtration, smart sensors, and premium aesthetics.',
    capacities: ['10 L', '12 L'],
    colorVariants: [
      {
        id: 'v1',
        color: '#2D2D2D',
        label: 'Black Platinum',
        images: ['https://images.unsplash.com/photo-1634676166113-f421f1d18721?q=80&w=400&h=400&fit=crop']
      }
    ]
  },
]

// =============================================
// ORDERS
// =============================================
export const orders = [
  { id: 'ORD-2026-001', customer: 'Rajesh Kumar', customerId: 'CUST001', product: 'AquaPure RO 7-Stage', amount: 12999, status: 'delivered', date: '2026-02-18', paymentMethod: 'UPI', address: '123 Marine Drive, Mumbai, MH 400001', payment: 'Paid' },
  { id: 'ORD-2026-002', customer: 'Sunita Verma', customerId: 'CUST002', product: 'Crystal UV Purifier', amount: 6999, status: 'shipped', date: '2026-02-18', paymentMethod: 'Net Banking', address: '45 Connaught Place, New Delhi, DL 110001', payment: 'Paid' },
  { id: 'ORD-2026-003', customer: 'Kavita Sharma', customerId: 'CUST005', product: 'Sediment Filter 10"', amount: 299, status: 'processing', date: '2026-02-17', paymentMethod: 'Credit Card', address: '78 MI Road, Jaipur, RJ 302001', payment: 'Paid' },
  { id: 'ORD-2026-004', customer: 'Rohit Patel', customerId: 'CUST006', product: 'AquaPure RO 5-Stage', amount: 9499, status: 'pending', date: '2026-02-17', paymentMethod: 'COD', address: '22 Ring Road, Surat, GJ 395001', payment: 'Pending' },
  { id: 'ORD-2026-005', customer: 'Arun Nair', customerId: 'CUST008', product: 'RO Membrane 75 GPD', amount: 899, status: 'delivered', date: '2026-02-16', paymentMethod: 'UPI', address: '14 MG Road, Kochi, KL 682001', payment: 'Paid' },
  { id: 'ORD-2026-006', customer: 'Kiran Rao', customerId: 'CUST014', product: 'AquaSoft Water Softener', amount: 18500, status: 'delivered', date: '2026-02-16', paymentMethod: 'EMI', address: '90 Indiranagar, Bengaluru, KA 560038', payment: 'Paid' },
  { id: 'ORD-2026-007', customer: 'Priya Joshi', customerId: 'CUST011', product: 'Carbon Block Filter', amount: 399, status: 'cancelled', date: '2026-02-15', paymentMethod: 'UPI', address: '34 Dharampeth, Nagpur, MH 440010', payment: 'Refunded' },
  { id: 'ORD-2026-008', customer: 'Suresh Reddy', customerId: 'CUST012', product: 'AquaPure RO 9-Stage Premium', amount: 17999, status: 'processing', date: '2026-02-15', paymentMethod: 'Net Banking', address: '56 Jubilee Hills, Hyderabad, TS 500033', payment: 'Paid' },
  { id: 'ORD-2026-009', customer: 'Neha Gupta', customerId: 'CUST015', product: 'AquaPure RO 5-Stage', amount: 9499, status: 'shipped', date: '2026-02-14', paymentMethod: 'Credit Card', address: '12 MP Nagar, Bhopal, MP 462011', payment: 'Paid' },
  { id: 'ORD-2026-010', customer: 'Anita Desai', customerId: 'CUST003', product: 'Filter Housing 10"', amount: 449, status: 'delivered', date: '2026-02-14', paymentMethod: 'UPI', address: '67 CG Road, Ahmedabad, GJ 380009', payment: 'Paid' },
  { id: 'ORD-2026-011', customer: 'Manoj Tiwari', customerId: 'CUST004', product: 'AquaPure RO 7-Stage', amount: 12999, status: 'pending', date: '2026-02-13', paymentMethod: 'COD', address: '23 Hazratganj, Lucknow, UP 226001', payment: 'Pending' },
  { id: 'ORD-2026-012', customer: 'Deepa Menon', customerId: 'CUST009', product: 'Crystal UV Purifier', amount: 6999, status: 'delivered', date: '2026-02-12', paymentMethod: 'UPI', address: '89 Kowdiar, Thiruvananthapuram, KL 695003', payment: 'Paid' },
]

// =============================================
// AMC PLANS
// =============================================
export const amcPlans = [
  { id: 'AMCP001', name: 'Basic Annual', price: 1999, duration: 12, services: 2, description: 'Annual filter replacement + 2 service visits', status: 'active', subscribers: 124 },
  { id: 'AMCP002', name: 'Standard Annual', price: 2999, duration: 12, services: 4, description: 'Quarterly service visits + filter replacement', status: 'active', subscribers: 156 },
  { id: 'AMCP003', name: 'Premium Annual', price: 4499, duration: 12, services: 6, description: 'Bi-monthly service + all parts covered', status: 'active', subscribers: 62 },
  { id: 'AMCP004', name: 'Basic 2-Year', price: 3499, duration: 24, services: 4, description: '2-year cover + 4 service visits', status: 'active', subscribers: 45 },
  { id: 'AMCP005', name: 'Commercial Plan', price: 12999, duration: 12, services: 12, description: 'Monthly service for commercial systems', status: 'active', subscribers: 8 },
  { id: 'AMCP006', name: 'Legacy Basic', price: 1499, duration: 12, services: 1, description: 'Old basic plan (discontinued)', status: 'inactive', subscribers: 0 },
]

// =============================================
// AMC SUBSCRIPTIONS
// =============================================
export const amcSubscriptions = [
  { id: 'SUB001', customer: 'Rajesh Kumar', customerId: 'CUST001', plan: 'Standard Annual', planId: 'AMCP002', product: 'AquaPure RO 7-Stage', startDate: '2025-06-01', endDate: '2026-05-31', status: 'active', nextService: '2026-03-01', autoRenew: true, amount: 2999 },
  { id: 'SUB002', customer: 'Sunita Verma', customerId: 'CUST002', plan: 'Basic Annual', planId: 'AMCP001', product: 'AquaPure RO 5-Stage', startDate: '2025-04-15', endDate: '2026-04-14', status: 'active', nextService: '2026-02-28', autoRenew: false, amount: 1999 },
  { id: 'SUB003', customer: 'Kiran Rao', customerId: 'CUST014', plan: 'Premium Annual', planId: 'AMCP003', product: 'AquaSoft Water Softener', startDate: '2025-03-05', endDate: '2026-03-04', status: 'expiring_soon', nextService: '2026-02-25', autoRenew: true, amount: 4499 },
  { id: 'SUB004', customer: 'Kavita Sharma', customerId: 'CUST005', plan: 'Standard Annual', planId: 'AMCP002', product: 'AquaPure RO 7-Stage', startDate: '2025-07-20', endDate: '2026-07-19', status: 'active', nextService: '2026-04-20', autoRenew: true, amount: 2999 },
  { id: 'SUB005', customer: 'Rohit Patel', customerId: 'CUST006', plan: 'Basic Annual', planId: 'AMCP001', product: 'Crystal UV Purifier', startDate: '2025-02-10', endDate: '2026-02-09', status: 'expiring_soon', nextService: '2026-02-20', autoRenew: false, amount: 1999 },
  { id: 'SUB006', customer: 'Arun Nair', customerId: 'CUST008', plan: 'Premium Annual', planId: 'AMCP003', product: 'AquaPure RO 7-Stage', startDate: '2025-08-01', endDate: '2026-07-31', status: 'active', nextService: '2026-04-01', autoRenew: true, amount: 4499 },
  { id: 'SUB007', customer: 'Manoj Tiwari', customerId: 'CUST004', plan: 'Basic Annual', planId: 'AMCP001', product: 'AquaPure RO 5-Stage', startDate: '2024-12-01', endDate: '2025-11-30', status: 'expired', nextService: null, autoRenew: false, amount: 1999 },
  { id: 'SUB008', customer: 'Priya Joshi', customerId: 'CUST011', plan: 'Standard Annual', planId: 'AMCP002', product: 'AquaPure RO 7-Stage', startDate: '2025-09-10', endDate: '2026-09-09', status: 'active', nextService: '2026-06-10', autoRenew: true, amount: 2999 },
  { id: 'SUB009', customer: 'Suresh Reddy', customerId: 'CUST012', plan: 'Premium Annual', planId: 'AMCP003', product: 'AquaPure RO 9-Stage Premium', startDate: '2025-10-01', endDate: '2026-09-30', status: 'active', nextService: '2026-04-01', autoRenew: true, amount: 4499 },
  { id: 'SUB010', customer: 'Lakshmi Iyer', customerId: 'CUST013', plan: 'Basic Annual', planId: 'AMCP001', product: 'Crystal UV Purifier', startDate: '2024-11-15', endDate: '2025-11-14', status: 'expired', nextService: null, autoRenew: false, amount: 1999 },
]

export const amcRenewals = [
  { id: 'REN001', subscriptionId: 'SUB003', customer: 'Kiran Rao', plan: 'Premium Annual', expiryDate: '2026-03-04', daysLeft: 13, reminderSent: true, status: 'pending', amount: 4499 },
  { id: 'REN002', subscriptionId: 'SUB005', customer: 'Rohit Patel', plan: 'Basic Annual', expiryDate: '2026-02-09', daysLeft: 20, reminderSent: true, status: 'pending', amount: 1999 },
  { id: 'REN003', subscriptionId: 'SUB002', customer: 'Sunita Verma', plan: 'Basic Annual', expiryDate: '2026-04-14', daysLeft: 54, reminderSent: false, status: 'pending', amount: 1999 },
  { id: 'REN004', subscriptionId: 'SUB007', customer: 'Manoj Tiwari', plan: 'Basic Annual', expiryDate: '2025-11-30', daysLeft: -81, reminderSent: true, status: 'lapsed', amount: 1999 },
  { id: 'REN005', subscriptionId: 'SUB010', customer: 'Lakshmi Iyer', plan: 'Basic Annual', expiryDate: '2025-11-14', daysLeft: -97, reminderSent: true, status: 'lapsed', amount: 1999 },
]

export const amcExpiryAlertsData = [
  { id: 'SUB003', customer: 'Kiran Rao', plan: 'Premium Annual', product: 'AquaSoft Water Softener', expiryDate: '2026-03-04', daysLeft: 13 },
  { id: 'SUB005', customer: 'Rohit Patel', plan: 'Basic Annual', product: 'Crystal UV Purifier', expiryDate: '2026-02-09', daysLeft: 20 },
  { id: 'SUB002', customer: 'Sunita Verma', plan: 'Basic Annual', product: 'AquaPure RO 5-Stage', expiryDate: '2026-04-14', daysLeft: 54 },
  { id: 'SUB001', customer: 'Rajesh Kumar', plan: 'Standard Annual', product: 'AquaPure RO 7-Stage', expiryDate: '2026-05-31', daysLeft: 101 },
]

// =============================================
// SERVICE REQUESTS
// =============================================
export const serviceRequests = [
  { id: 'SRV001', customer: 'Anita Desai', customerId: 'CUST003', type: 'amc', issue: 'Filter replacement due', assignedTo: 'Suresh Kumar', status: 'pending', priority: 'medium', scheduledDate: '2026-02-22', createdAt: '2026-02-15' },
  { id: 'SRV002', customer: 'Rajesh Kumar', customerId: 'CUST001', type: 'paid', issue: 'Pump making noise', assignedTo: 'Sneha Rao', status: 'in_progress', priority: 'high', scheduledDate: '2026-02-19', createdAt: '2026-02-14' },
  { id: 'SRV003', customer: 'Sunita Verma', customerId: 'CUST002', type: 'amc', issue: 'Routine quarterly service', assignedTo: 'Suresh Kumar', status: 'completed', priority: 'low', scheduledDate: '2026-02-10', createdAt: '2026-02-08' },
  { id: 'SRV004', customer: 'Kavita Sharma', customerId: 'CUST005', type: 'paid', issue: 'Water leakage from tank', assignedTo: 'Mohan Das', status: 'pending', priority: 'high', scheduledDate: '2026-02-20', createdAt: '2026-02-16' },
  { id: 'SRV005', customer: 'Kiran Rao', customerId: 'CUST014', type: 'amc', issue: 'TDS level too high', assignedTo: 'Sneha Rao', status: 'assigned', priority: 'medium', scheduledDate: '2026-02-21', createdAt: '2026-02-15' },
  { id: 'SRV006', customer: 'Priya Joshi', customerId: 'CUST011', type: 'paid', issue: 'Membrane replacement', assignedTo: 'Suresh Kumar', status: 'in_progress', priority: 'medium', scheduledDate: '2026-02-19', createdAt: '2026-02-13' },
  { id: 'SRV007', customer: 'Arun Nair', customerId: 'CUST008', type: 'amc', issue: 'Annual filter set replacement', assignedTo: null, status: 'pending', priority: 'low', scheduledDate: '2026-02-25', createdAt: '2026-02-17' },
  { id: 'SRV008', customer: 'Suresh Reddy', customerId: 'CUST012', type: 'paid', issue: 'RO not producing water', assignedTo: 'Sneha Rao', status: 'completed', priority: 'high', scheduledDate: '2026-02-12', createdAt: '2026-02-11' },
  { id: 'SRV009', customer: 'Meena Patel', customerId: 'CUST007', type: 'paid', issue: 'Bad taste in water', assignedTo: null, status: 'pending', priority: 'medium', scheduledDate: '2026-02-23', createdAt: '2026-02-17' },
  { id: 'SRV010', customer: 'Rohit Patel', customerId: 'CUST006', type: 'amc', issue: 'UV lamp replacement', assignedTo: 'Mohan Das', status: 'cancelled', priority: 'low', scheduledDate: '2026-02-15', createdAt: '2026-02-10' },
  { id: 'SRV011', customer: 'Vikram Singh', customerId: 'CUST010', type: 'amc', issue: 'General Checkup', assignedTo: 'Priya Sharma', status: 'pending', priority: 'low', scheduledDate: '2026-02-26', createdAt: '2026-02-18' },
  { id: 'SRV012', customer: 'Deepa Menon', customerId: 'CUST009', type: 'paid', issue: 'Installation of new unit', assignedTo: 'Rahul Mehta', status: 'scheduled', priority: 'high', scheduledDate: '2026-02-24', createdAt: '2026-02-18' },
  { id: 'SRV013', customer: 'Lakshmi Iyer', customerId: 'CUST013', type: 'paid', issue: 'Water flow slow', assignedTo: null, status: 'open', priority: 'medium', scheduledDate: null, createdAt: '2026-02-19' },
  { id: 'SRV014', customer: 'Neha Gupta', customerId: 'CUST015', type: 'amc', issue: 'Pre-filter cleaning', assignedTo: 'Suresh Kumar', status: 'assignments', priority: 'low', scheduledDate: '2026-02-27', createdAt: '2026-02-18' },
  { id: 'SRV015', customer: 'Manoj Tiwari', customerId: 'CUST004', type: 'paid', issue: 'Relocation of unit', assignedTo: 'Mohan Das', status: 'completed', priority: 'medium', scheduledDate: '2026-02-10', createdAt: '2026-02-05' },
  { id: 'SRV016', customer: 'Rajesh Kumar', customerId: 'CUST001', type: 'amc', issue: 'Routine Check', assignedTo: 'Sneha Rao', status: 'pending', priority: 'low', scheduledDate: '2026-03-01', createdAt: '2026-02-20' },
  { id: 'SRV017', customer: 'Sunita Verma', customerId: 'CUST002', type: 'paid', issue: 'Display not working', assignedTo: null, status: 'open', priority: 'medium', scheduledDate: null, createdAt: '2026-02-19' },
  { id: 'SRV018', customer: 'Arun Nair', customerId: 'CUST008', type: 'paid', issue: 'External sediment filter change', assignedTo: 'Suresh Kumar', status: 'scheduled', priority: 'low', scheduledDate: '2026-02-28', createdAt: '2026-02-18' },
  { id: 'SRV019', customer: 'Kavita Sharma', customerId: 'CUST005', type: 'amc', issue: 'Carbon filter verification', assignedTo: 'Mohan Das', status: 'in_progress', priority: 'high', scheduledDate: '2026-02-20', createdAt: '2026-02-15' },
  { id: 'SRV020', customer: 'Priya Joshi', customerId: 'CUST011', type: 'amc', issue: 'Taste issue check', assignedTo: null, status: 'open', priority: 'high', scheduledDate: null, createdAt: '2026-02-19' },
]

// =============================================
// DEMO BOOKINGS
// =============================================
export const demoBookings = [
  { id: 'DEMO001', customer: 'Vikram Singh', phone: '+91 87654 32109', email: 'vikram@email.com', product: 'AquaPure RO 7-Stage', scheduledDate: '2026-02-20', scheduledTime: '10:00 AM', assignedTo: 'Priya Sharma', status: 'scheduled', address: 'Pune, Maharashtra', notes: 'Customer interested in home demo' },
  { id: 'DEMO002', customer: 'Arjun Kapoor', phone: '+91 76543 21087', email: 'arjun.k@email.com', product: 'AquaSoft Water Softener', scheduledDate: '2026-02-21', scheduledTime: '02:00 PM', assignedTo: 'Rahul Mehta', status: 'scheduled', address: 'Andheri, Mumbai', notes: 'Interested in commercial solution' },
  { id: 'DEMO003', customer: 'Sonia Pandey', phone: '+91 98765 12309', email: 'sonia.p@email.com', product: 'AquaPure RO 9-Stage Premium', scheduledDate: '2026-02-19', scheduledTime: '11:30 AM', assignedTo: null, status: 'scheduled', address: 'Indiranagar, Bengaluru', notes: '' },
  { id: 'DEMO004', customer: 'Harish Mehta', phone: '+91 91234 87650', email: 'harish.m@email.com', product: 'Crystal UV Purifier', scheduledDate: '2026-02-18', scheduledTime: '04:00 PM', assignedTo: 'Divya Nair', status: 'completed', address: 'Salt Lake, Kolkata', notes: 'Demo completed, customer interested' },
  { id: 'DEMO005', customer: 'Rekha Jain', phone: '+91 80123 65478', email: 'rekha.j@email.com', product: 'AquaPure RO 5-Stage', scheduledDate: '2026-02-17', scheduledTime: '09:30 AM', assignedTo: 'Priya Sharma', status: 'completed', address: 'C-Scheme, Jaipur', notes: 'Order placed after demo' },
  { id: 'DEMO006', customer: 'Nitesh Agarwal', phone: '+91 77654 32010', email: 'nitesh.a@email.com', product: 'AquaPure RO 7-Stage', scheduledDate: '2026-02-16', scheduledTime: '03:00 PM', assignedTo: 'Rahul Mehta', status: 'cancelled', address: 'Gomti Nagar, Lucknow', notes: 'Customer cancelled' },
  { id: 'DEMO007', customer: 'Pooja Mishra', phone: '+91 99001 45678', email: 'pooja.m@email.com', product: 'AquaPure RO 9-Stage Premium', scheduledDate: '2026-02-22', scheduledTime: '11:00 AM', assignedTo: null, status: 'scheduled', address: 'Aundh, Pune', notes: 'High value prospect' },
  { id: 'DEMO008', customer: 'Gautam Shah', phone: '+91 88654 32019', email: 'gautam.s@email.com', product: 'Commercial System 100LPH', scheduledDate: '2026-02-24', scheduledTime: '10:00 AM', assignedTo: 'Divya Nair', status: 'scheduled', address: 'GIDC, Vadodara', notes: 'Factory demo' },
  { id: 'DEMO009', customer: 'Riya Sen', phone: '+91 90123 45678', email: 'riya.s@email.com', product: 'AquaPure RO 5-Stage', scheduledDate: '2026-02-23', scheduledTime: '01:00 PM', assignedTo: null, status: 'scheduled', address: 'Koramangala, Bengaluru', notes: 'Referral form existing customer' },
  { id: 'DEMO010', customer: 'Kunal Khemu', phone: '+91 89012 34567', email: 'kunal.k@email.com', product: 'AquaSoft Water Softener', scheduledDate: '2026-02-25', scheduledTime: '10:30 AM', assignedTo: 'Rahul Mehta', status: 'scheduled', address: 'Bandra, Mumbai', notes: 'Hard water issues' },
  { id: 'DEMO011', customer: 'Meera Rajput', phone: '+91 78901 23456', email: 'meera.r@email.com', product: 'AquaPure RO 7-Stage', scheduledDate: '2026-02-26', scheduledTime: '04:00 PM', assignedTo: null, status: 'scheduled', address: 'Vasant Vihar, Delhi', notes: '' },
  { id: 'DEMO012', customer: 'Varun Dhawan', phone: '+91 67890 12345', email: 'varun.d@email.com', product: 'Crystal UV Purifier', scheduledDate: '2026-02-15', scheduledTime: '11:00 AM', assignedTo: 'Priya Sharma', status: 'completed', address: 'Juhu, Mumbai', notes: 'Liked the product' },
  { id: 'DEMO013', customer: 'Alia Bhatt', phone: '+91 56789 01234', email: 'alia.b@email.com', product: 'AquaPure RO 9-Stage Premium', scheduledDate: '2026-02-27', scheduledTime: '02:00 PM', assignedTo: 'Divya Nair', status: 'scheduled', address: 'Pali Hill, Mumbai', notes: 'Premium request' },
  { id: 'DEMO014', customer: 'Ranbir Kapoor', phone: '+91 45678 90123', email: 'ranbir.k@email.com', product: 'Commercial System 100LPH', scheduledDate: '2026-02-28', scheduledTime: '10:00 AM', assignedTo: null, status: 'scheduled', address: 'Chembur, Mumbai', notes: 'For office' },
  { id: 'DEMO015', customer: 'Deepika Padukone', phone: '+91 34567 89012', email: 'deepika.p@email.com', product: 'AquaPure RO 7-Stage', scheduledDate: '2026-02-14', scheduledTime: '05:00 PM', assignedTo: 'Rahul Mehta', status: 'rescheduled', address: 'Prabhadevi, Mumbai', notes: 'Customer unavailable' },
]

// =============================================
// SUPPORT TICKETS
// =============================================
export const supportTickets = [
  { id: 'TKT001', subject: 'Water purifier not working', customer: 'Meena Patel', customerId: 'CUST007', priority: 'high', status: 'open', category: 'Technical', createdAt: '2026-02-18', lastUpdated: '2026-02-19', assignedTo: 'Ananya Singh' },
  { id: 'TKT002', subject: 'AMC renewal invoice not received', customer: 'Sunita Verma', customerId: 'CUST002', priority: 'medium', status: 'in_progress', category: 'Billing', createdAt: '2026-02-17', lastUpdated: '2026-02-18', assignedTo: 'Ajay Gupta' },
  { id: 'TKT003', subject: 'TDS reading seems incorrect', customer: 'Kiran Rao', customerId: 'CUST014', priority: 'low', status: 'resolved', category: 'Technical', createdAt: '2026-02-15', lastUpdated: '2026-02-17', assignedTo: 'Ananya Singh' },
  { id: 'TKT004', subject: 'Order delivered with missing parts', customer: 'Arun Nair', customerId: 'CUST008', priority: 'high', status: 'open', category: 'Order', createdAt: '2026-02-16', lastUpdated: '2026-02-16', assignedTo: null },
  { id: 'TKT005', subject: 'Request for AMC plan upgrade', customer: 'Priya Joshi', customerId: 'CUST011', priority: 'low', status: 'resolved', category: 'AMC', createdAt: '2026-02-14', lastUpdated: '2026-02-15', assignedTo: 'Ajay Gupta' },
  { id: 'TKT006', subject: 'Noisy pump after service visit', customer: 'Rajesh Kumar', customerId: 'CUST001', priority: 'medium', status: 'in_progress', category: 'Technical', createdAt: '2026-02-13', lastUpdated: '2026-02-18', assignedTo: 'Ananya Singh' },
  { id: 'TKT007', subject: 'Refund request for cancelled order', customer: 'Priya Joshi', customerId: 'CUST011', priority: 'high', status: 'open', category: 'Billing', createdAt: '2026-02-12', lastUpdated: '2026-02-19', assignedTo: 'Ajay Gupta' },
  { id: 'TKT008', subject: 'Demo not completed as scheduled', customer: 'Vikram Singh', customerId: 'CUST010', priority: 'medium', status: 'closed', category: 'General', createdAt: '2026-02-10', lastUpdated: '2026-02-12', assignedTo: 'Ananya Singh' },
  { id: 'TKT009', subject: 'App login issue on mobile', customer: 'Suresh Reddy', customerId: 'CUST012', priority: 'low', status: 'resolved', category: 'Technical', createdAt: '2026-02-09', lastUpdated: '2026-02-11', assignedTo: 'Ajay Gupta' },
  { id: 'TKT010', subject: 'Warranty claim for defective filter', customer: 'Kavita Sharma', customerId: 'CUST005', priority: 'high', status: 'in_progress', category: 'Technical', createdAt: '2026-02-08', lastUpdated: '2026-02-17', assignedTo: 'Ananya Singh' },
]

// =============================================
// CONFIGURATIONS
// =============================================
export const coupons = [
  { id: 'CPN001', code: 'AQUA10', discount: 10, type: 'percentage', minOrder: 999, validUntil: '2026-03-31', usageCount: 45, maxUsage: 100, status: 'active' },
  { id: 'CPN002', code: 'SAVE500', discount: 500, type: 'flat', minOrder: 5000, validUntil: '2026-02-28', usageCount: 88, maxUsage: 100, status: 'active' },
  { id: 'CPN003', code: 'NEWUSER20', discount: 20, type: 'percentage', minOrder: 0, validUntil: '2026-12-31', usageCount: 124, maxUsage: 500, status: 'active' },
  { id: 'CPN004', code: 'MONSOON15', discount: 15, type: 'percentage', minOrder: 2000, validUntil: '2025-09-30', usageCount: 200, maxUsage: 200, status: 'inactive' },
  { id: 'CPN005', code: 'AMC200', discount: 200, type: 'flat', minOrder: 1999, validUntil: '2026-06-30', usageCount: 32, maxUsage: 150, status: 'active' },
]

export const notifications = [
  { id: 'NOTIF001', title: 'AMC Renewal Reminder', message: 'Your AMC is expiring in 30 days. Renew now to avoid service interruption.', type: 'push', audience: 'AMC Customers', status: 'sent', sentAt: '2026-02-15', reach: 38 },
  { id: 'NOTIF002', title: 'New Product Launch — RO 9-Stage', message: 'Introducing our premium 9-stage RO purifier with mineral enhancement.', type: 'email', audience: 'All Customers', status: 'sent', sentAt: '2026-02-10', reach: 1284 },
  { id: 'NOTIF003', title: 'Service Schedule Update', message: 'Your service visit is scheduled for tomorrow between 10 AM – 12 PM.', type: 'sms', audience: 'Pending Service', status: 'sent', sentAt: '2026-02-18', reach: 12 },
  { id: 'NOTIF004', title: 'Summer Offer — 15% Off', message: 'Beat the heat with purified water. Get 15% off on all purifiers this summer.', type: 'push', audience: 'All Customers', status: 'draft', sentAt: null, reach: 0 },
  { id: 'NOTIF005', title: 'Service Feedback Request', message: 'How was your recent service experience? Rate us and help us improve.', type: 'email', audience: 'Recent Service', status: 'scheduled', sentAt: '2026-02-22', reach: 0 },
]

export const banners = [
  { id: 'BAN001', title: 'Summer Purification Sale', position: 'Home Top', status: 'active', startDate: '2026-03-01', endDate: '2026-05-31', clicks: 0 },
  { id: 'BAN002', title: 'AMC Renewal Offer', position: 'Dashboard Banner', status: 'active', startDate: '2026-02-01', endDate: '2026-03-31', clicks: 234 },
  { id: 'BAN003', title: 'New Product Launch', position: 'Product Page Top', status: 'inactive', startDate: '2026-01-15', endDate: '2026-02-15', clicks: 890 },
  { id: 'BAN004', title: 'Referral Program', position: 'Home Middle', status: 'active', startDate: '2026-01-01', endDate: '2026-12-31', clicks: 456 },
]

export const blogs = [
  { id: 'BLG001', title: '10 Signs Your Water Purifier Needs Servicing', author: 'Priya Sharma', category: 'Maintenance', status: 'published', publishedAt: '2026-02-15', views: 1234 },
  { id: 'BLG002', title: 'RO vs UV vs UF: Which Is Best for You?', author: 'Rahul Mehta', category: 'Buying Guide', status: 'published', publishedAt: '2026-02-08', views: 3456 },
  { id: 'BLG003', title: 'Understanding TDS: What It Means for Your Health', author: 'Priya Sharma', category: 'Health', status: 'published', publishedAt: '2026-01-28', views: 2187 },
  { id: 'BLG004', title: 'Benefits of Annual Maintenance Contract for Water Purifiers', author: 'Divya Nair', category: 'AMC', status: 'draft', publishedAt: null, views: 0 },
  { id: 'BLG005', title: 'How Hard Water Affects Your Appliances', author: 'Rahul Mehta', category: 'Education', status: 'published', publishedAt: '2026-01-15', views: 987 },
]

export const inquiries = [
  { id: 'INQ001', name: 'Ramesh Chandra', email: 'ramesh.c@email.com', phone: '+91 98001 23456', message: 'I want to know about bulk order pricing for 50 purifiers for our office.', status: 'open', receivedAt: '2026-02-19' },
  { id: 'INQ002', name: 'Geeta Bose', email: 'geeta.b@email.com', phone: '+91 91002 34567', message: 'Looking for a dealer franchise opportunity in West Bengal.', status: 'in_progress', receivedAt: '2026-02-17' },
  { id: 'INQ003', name: 'Sameer Khan', email: 'sameer.k@email.com', phone: '+91 85003 45678', message: 'Need a water quality test for my area before buying.', status: 'resolved', receivedAt: '2026-02-15' },
  { id: 'INQ004', name: 'Anjali Verma', email: 'anjali.v@email.com', phone: '+91 76004 56789', message: 'Want to install RO system in new apartment, need consultation.', status: 'open', receivedAt: '2026-02-14' },
  { id: 'INQ005', name: 'Prakash Rao', email: 'prakash.r@email.com', phone: '+91 99005 67890', message: 'Interested in commercial 500 LPH system for my restaurant.', status: 'in_progress', receivedAt: '2026-02-12' },
]

// =============================================
// REPORTS
// =============================================
export const salesReport = {
  monthly: [
    { month: 'Mar', revenue: 198000, orders: 72, units: 65 },
    { month: 'Apr', revenue: 225000, orders: 84, units: 78 },
    { month: 'May', revenue: 312000, orders: 110, units: 102 },
    { month: 'Jun', revenue: 287000, orders: 98, units: 90 },
    { month: 'Jul', revenue: 345000, orders: 124, units: 115 },
    { month: 'Aug', revenue: 298000, orders: 105, units: 98 },
    { month: 'Sep', revenue: 267000, orders: 92, units: 85 },
    { month: 'Oct', revenue: 389000, orders: 138, units: 130 },
    { month: 'Nov', revenue: 412000, orders: 148, units: 140 },
    { month: 'Dec', revenue: 478000, orders: 172, units: 165 },
    { month: 'Jan', revenue: 356000, orders: 126, units: 118 },
    { month: 'Feb', revenue: 240000, orders: 87, units: 80 },
  ],
  topProducts: [
    { product: 'AquaPure RO 7-Stage', revenue: 728000, units: 56 },
    { product: 'AquaPure RO 5-Stage', revenue: 484000, units: 51 },
    { product: 'AquaSoft Water Softener', revenue: 444000, units: 24 },
    { product: 'Crystal UV Purifier', revenue: 335000, units: 48 },
    { product: 'AquaPure RO 9-Stage Premium', revenue: 306000, units: 17 },
  ],
  totalRevenue: '₹36,05,000',
  totalOrders: 1356,
  avgOrderValue: '₹2,659',
  growthRate: '+18.4%',
}

export const paymentReport = {
  byMethod: [
    { method: 'UPI', amount: 1442000, count: 542, percentage: 40 },
    { method: 'Credit Card', amount: 1082000, count: 278, percentage: 30 },
    { method: 'Net Banking', amount: 721000, count: 189, percentage: 20 },
    { method: 'COD', amount: 216000, count: 216, percentage: 6 },
    { method: 'EMI', amount: 144000, count: 26, percentage: 4 },
  ],
  recentTransactions: [
    { id: 'TXN001', customer: 'Rajesh Kumar', amount: 12999, method: 'UPI', status: 'success', date: '2026-02-18', orderId: 'ORD-2026-001' },
    { id: 'TXN002', customer: 'Sunita Verma', amount: 6999, method: 'Net Banking', status: 'success', date: '2026-02-18', orderId: 'ORD-2026-002' },
    { id: 'TXN003', customer: 'Kavita Sharma', amount: 299, method: 'Credit Card', status: 'success', date: '2026-02-17', orderId: 'ORD-2026-003' },
    { id: 'TXN004', customer: 'Rohit Patel', amount: 9499, method: 'COD', status: 'pending', date: '2026-02-17', orderId: 'ORD-2026-004' },
    { id: 'TXN005', customer: 'Priya Joshi', amount: 399, method: 'UPI', status: 'refunded', date: '2026-02-15', orderId: 'ORD-2026-007' },
    { id: 'TXN006', customer: 'Kiran Rao', amount: 18500, method: 'EMI', status: 'success', date: '2026-02-16', orderId: 'ORD-2026-006' },
    { id: 'TXN007', customer: 'Arun Nair', amount: 899, method: 'UPI', status: 'success', date: '2026-02-16', orderId: 'ORD-2026-005' },
    { id: 'TXN008', customer: 'Suresh Reddy', amount: 17999, method: 'Net Banking', status: 'success', date: '2026-02-15', orderId: 'ORD-2026-008' },
  ],
}

// =============================================
// SYSTEM SETTINGS
// =============================================
export const systemSettings = {
  general: {
    companyName: 'Aquaphil Water Solutions Pvt. Ltd.',
    email: 'support@aquaphil.com',
    phone: '+91 1800-XXX-XXXX',
    address: '45 Industrial Area, Phase 2, Chandigarh, PB 160002',
    gstNumber: '03AAACA1234Q1ZA',
    timezone: 'Asia/Kolkata (IST)',
    currency: 'INR (₹)',
    language: 'English',
  },
  amc: {
    defaultReminderDays: 30,
    autoRenewalGracePeriod: 7,
    maxServiceVisitsCarryover: 1,
    serviceWindowHours: '9:00 AM – 6:00 PM',
    allowSelfBooking: true,
    requireApprovalForPaidServices: true,
  },
  serviceTypes: [
    { id: 'ST001', name: 'Filter Replacement', duration: 60, charges: 0, status: 'active' },
    { id: 'ST002', name: 'General Servicing', duration: 90, charges: 0, status: 'active' },
    { id: 'ST003', name: 'Membrane Replacement', duration: 120, charges: 1499, status: 'active' },
    { id: 'ST004', name: 'UV Lamp Replacement', duration: 45, charges: 799, status: 'active' },
    { id: 'ST005', name: 'Pump Repair', duration: 180, charges: 1999, status: 'active' },
    { id: 'ST006', name: 'Full System Overhaul', duration: 240, charges: 3999, status: 'active' },
  ],
}
export const dashboardStats = {
  totalCustomers: 1284,
  activeAMC: 342,
  pendingServices: 28,
  upcomingDemos: 7,
  monthlyRevenue: 240000,
  openTickets: 15,
  recentOrders: orders.slice(0, 5),
  amcExpiringThisMonth: amcSubscriptions.filter(a => a.status === 'active' || a.status === 'expiring_soon').slice(0, 3),
  pendingServiceRequests: serviceRequests.filter(s => s.status === 'pending'),
  upcomingDemoBookings: demoBookings.filter(d => d.status === 'scheduled'),
};
