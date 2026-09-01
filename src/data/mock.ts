export const categories = [
  { id: '1', name: 'Electronics', nameF: 'Électronique', icon: 'Cpu', count: 2450, image: 'photo-1498049794561-7780e7231661' },
  { id: '2', name: 'Fashion', nameF: 'Mode', icon: 'Shirt', count: 3820, image: 'photo-1445205170230-053b83016050' },
  { id: '3', name: 'Food & Grocery', nameF: 'Alimentation', icon: 'ShoppingBasket', count: 1890, image: 'photo-1542838132-92c53300491e' },
  { id: '4', name: 'Home & Living', nameF: 'Maison', icon: 'Home', count: 2100, image: 'photo-1555041469-a586c61ea9bc' },
  { id: '5', name: 'Beauty', nameF: 'Beauté', icon: 'Sparkles', count: 980, image: 'photo-1522335789203-aabd1fc54bc9' },
  { id: '6', name: 'Sports', nameF: 'Sports', icon: 'Dumbbell', count: 1340, image: 'photo-1571019613454-1cb2f99b2d8b' },
  { id: '7', name: 'Phones', nameF: 'Téléphones', icon: 'Smartphone', count: 760, image: 'photo-1511707171634-5f897ff02aa9' },
  { id: '8', name: 'Accessories', nameF: 'Accessoires', icon: 'Watch', count: 1560, image: 'photo-1523275335684-37898b6baf30' },
  { id: '9', name: 'Local Products', nameF: 'Produits Locaux', icon: 'MapPin', count: 640, image: 'photo-1542223616-9de9adb5e3e8' },
];

export const sellers = [
  { id: '1', name: 'TechStore MG', logo: 'photo-1611532736597-de2d4265fba3', cover: 'photo-1451187580459-43490279c0fa', verified: true, rating: 4.9, products: 1240, location: 'Antananarivo', joined: '2023', followers: 8420, description: 'Official distributor of electronics and technology products.' },
  { id: '2', name: 'Lewis Store', logo: 'photo-1507003211169-0a1dd7228f2d', cover: 'photo-1441986300917-64674bd600d8', verified: true, rating: 4.8, products: 860, location: 'Toamasina', joined: '2022', followers: 5200, description: 'Premium fashion and lifestyle products.' },
  { id: '3', name: 'MasoMaro Market', logo: 'photo-1494790108377-be9c29b29330', cover: 'photo-1542838132-92c53300491e', verified: true, rating: 4.7, products: 2100, location: 'Fianarantsoa', joined: '2021', followers: 12300, description: 'Fresh local produce and grocery essentials.' },
  { id: '4', name: 'Homelux', logo: 'photo-1438761681033-6461ffad8d80', cover: 'photo-1555041469-a586c61ea9bc', verified: false, rating: 4.5, products: 450, location: 'Mahajanga', joined: '2024', followers: 1800, description: 'Quality home furniture and decor.' },
  { id: '5', name: 'BeautyHub', logo: 'photo-1517841905240-472988babdf9', cover: 'photo-1522335789203-aabd1fc54bc9', verified: true, rating: 4.8, products: 380, location: 'Antananarivo', joined: '2023', followers: 6700, description: 'Authentic beauty and skincare products.' },
  { id: '6', name: 'SportZone', logo: 'photo-1472099645785-5658abf4ff4e', cover: 'photo-1571019613454-1cb2f99b2d8b', verified: true, rating: 4.6, products: 620, location: 'Antsiranana', joined: '2022', followers: 3900, description: 'Sports equipment and activewear.' },
];

export const products = [
  { id: '1', name: 'Samsung Galaxy A56', nameF: 'Samsung Galaxy A56', brand: 'Samsung', price: 1299000, originalPrice: 1450000, discount: 10, rating: 4.8, reviews: 342, sellerId: '1', sellerName: 'TechStore MG', categoryId: '7', image: 'photo-1511707171634-5f897ff02aa9', stock: 45, tags: ['smartphone', '5G'], description: 'Latest Samsung Galaxy A-series smartphone with 6.7" display, 108MP camera, and 5000mAh battery.', specs: { Display: '6.7" AMOLED', Processor: 'Exynos 1380', RAM: '8GB', Storage: '256GB', Camera: '108MP', Battery: '5000mAh' } },
  { id: '2', name: 'AirPods Pro 2nd Gen', nameF: 'AirPods Pro 2ème Gén.', brand: 'Apple', price: 890000, originalPrice: null, discount: 0, rating: 4.9, reviews: 891, sellerId: '1', sellerName: 'TechStore MG', categoryId: '1', image: 'photo-1606220945770-b5b6c2c55bf1', stock: 23, tags: ['wireless', 'audio'], description: 'Premium noise-canceling wireless earbuds with spatial audio.', specs: { 'Noise Cancellation': 'Active', 'Battery Life': '6h + 24h case', Connectivity: 'Bluetooth 5.3', Resistance: 'IPX4' } },
  { id: '3', name: 'Linen Casual Shirt', nameF: 'Chemise Casual Lin', brand: 'H&M', price: 89000, originalPrice: 120000, discount: 26, rating: 4.5, reviews: 156, sellerId: '2', sellerName: 'Lewis Store', categoryId: '2', image: 'photo-1596755094514-f87e34085b2c', stock: 120, tags: ['casual', 'summer'], description: 'Breathable 100% linen shirt perfect for warm weather.', specs: { Material: '100% Linen', Fit: 'Regular', Care: 'Machine wash cold', Origin: 'Portugal' } },
  { id: '4', name: 'Organic Vanilla Extract', nameF: 'Extrait de Vanille Bio', brand: 'Isalo Naturals', price: 45000, originalPrice: null, discount: 0, rating: 4.7, reviews: 89, sellerId: '3', sellerName: 'MasoMaro Market', categoryId: '3', image: 'photo-1509440159596-0249088772ff', stock: 200, tags: ['organic', 'local'], description: 'Premium Malagasy vanilla extract from Sava region farmers.', specs: { Volume: '100ml', Origin: 'Madagascar', Grade: 'Premium A', Certification: 'Organic' } },
  { id: '5', name: 'Wooden Desk Lamp', nameF: 'Lampe de Bureau Bois', brand: 'Homelux', price: 178000, originalPrice: 220000, discount: 19, rating: 4.6, reviews: 67, sellerId: '4', sellerName: 'Homelux', categoryId: '4', image: 'photo-1507003211169-0a1dd7228f2d', stock: 34, tags: ['lighting', 'wood'], description: 'Minimalist bamboo desk lamp with USB charging port and adjustable brightness.', specs: { Material: 'Bamboo', 'Bulb Type': 'LED', Wattage: '12W', 'USB Port': 'Yes' } },
  { id: '6', name: 'Vitamin C Serum', nameF: 'Sérum Vitamine C', brand: 'BeautyHub', price: 65000, originalPrice: null, discount: 0, rating: 4.8, reviews: 234, sellerId: '5', sellerName: 'BeautyHub', categoryId: '5', image: 'photo-1556228578-8c89e6adf883', stock: 78, tags: ['skincare', 'serum'], description: '20% Vitamin C brightening serum for radiant skin.', specs: { Volume: '30ml', 'Vitamin C': '20%', 'Skin Type': 'All', Paraben: 'Free' } },
  { id: '7', name: 'Running Shoes Pro', nameF: 'Chaussures Running Pro', brand: 'Nike', price: 450000, originalPrice: 520000, discount: 13, rating: 4.7, reviews: 445, sellerId: '6', sellerName: 'SportZone', categoryId: '6', image: 'photo-1542291026-7eec264c27ff', stock: 56, tags: ['running', 'sports'], description: 'Professional running shoes with ReactX foam for maximum energy return.', specs: { Upper: 'Flyknit', Sole: 'ReactX foam', Drop: '10mm', Weight: '278g' } },
  { id: '8', name: 'MacBook Air M3', nameF: 'MacBook Air M3', brand: 'Apple', price: 5200000, originalPrice: 5500000, discount: 5, rating: 4.9, reviews: 1203, sellerId: '1', sellerName: 'TechStore MG', categoryId: '1', image: 'photo-1517336714731-489689fd1ca8', stock: 12, tags: ['laptop', 'Apple', 'M3'], description: 'Ultra-thin laptop with Apple M3 chip, 18-hour battery life.', specs: { Chip: 'Apple M3', RAM: '16GB', Storage: '512GB SSD', Display: '15.3" Liquid Retina', Battery: '18h' } },
];

export const orders = [
  { id: 'ORD-2026-001', date: '2026-08-28', status: 'delivered', total: 1388000, items: [{ product: products[0], qty: 1 }, { product: products[2], qty: 1 }], seller: 'TechStore MG & Lewis Store', tracking: 'TRK892345MG', estimatedDelivery: '2026-09-01', address: '12 Rue Rainitovo, Antananarivo 101' },
  { id: 'ORD-2026-002', date: '2026-08-30', status: 'shipped', total: 890000, items: [{ product: products[1], qty: 1 }], seller: 'TechStore MG', tracking: 'TRK892346MG', estimatedDelivery: '2026-09-03', address: '45 Avenue de l\'Indépendance, Antananarivo 101' },
  { id: 'ORD-2026-003', date: '2026-09-01', status: 'processing', total: 243000, items: [{ product: products[3], qty: 2 }, { product: products[5], qty: 1 }], seller: 'MasoMaro Market & BeautyHub', tracking: null, estimatedDelivery: '2026-09-05', address: '12 Rue Rainitovo, Antananarivo 101' },
];

export const sellerMetrics = {
  revenue: 12580000,
  orders: 183,
  products: 426,
  lowStock: 8,
  revenueChange: 12.4,
  ordersChange: 8.1,
  productsChange: 5.2,
  lowStockChange: -2,
};

export const revenueData = [
  { month: 'Mar', revenue: 7200000, orders: 98 },
  { month: 'Apr', revenue: 8100000, orders: 112 },
  { month: 'May', revenue: 9400000, orders: 128 },
  { month: 'Jun', revenue: 8800000, orders: 119 },
  { month: 'Jul', revenue: 11200000, orders: 152 },
  { month: 'Aug', revenue: 12580000, orders: 183 },
];

export const adminMetrics = {
  totalRevenue: 284500000,
  totalOrders: 8432,
  totalBuyers: 24800,
  totalSellers: 342,
  totalProducts: 18650,
  pendingApplications: 14,
  pendingProducts: 38,
};

export const adminRevenueData = [
  { month: 'Mar', revenue: 38000000, sellers: 290, buyers: 18200 },
  { month: 'Apr', revenue: 42000000, sellers: 308, buyers: 19800 },
  { month: 'May', revenue: 51000000, sellers: 318, buyers: 21300 },
  { month: 'Jun', revenue: 47000000, sellers: 325, buyers: 22100 },
  { month: 'Jul', revenue: 62000000, sellers: 336, buyers: 23500 },
  { month: 'Aug', revenue: 74500000, sellers: 342, buyers: 24800 },
];

export const sellerApplications = [
  { id: 'APP-001', businessName: 'NovaTech MG', owner: 'Rakoto Jean', email: 'rakoto@novatech.mg', phone: '+261 34 123 4567', location: 'Antananarivo', category: 'Electronics', date: '2026-08-29', status: 'pending' },
  { id: 'APP-002', businessName: 'Saveur Malgache', owner: 'Ravelo Marie', email: 'marie@saveurmalgache.mg', phone: '+261 32 987 6543', location: 'Fianarantsoa', category: 'Food', date: '2026-08-30', status: 'pending' },
  { id: 'APP-003', businessName: 'FashionCity', owner: 'Rabe Paul', email: 'paul@fashioncity.mg', phone: '+261 33 456 7890', location: 'Toamasina', category: 'Fashion', date: '2026-09-01', status: 'pending' },
];

export const formatPrice = (price: number) => `${price.toLocaleString('fr-MG')} Ar`;
