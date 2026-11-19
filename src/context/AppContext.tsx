import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  SavedItem, 
  User, 
  Address, 
  Order, 
  ProductCategory, 
  OrderStatus 
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export interface AppContextType {
  // Products & Search
  products: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  primeOnly: boolean;
  setPrimeOnly: (val: boolean) => void;
  minRating: number;
  setMinRating: (val: number) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrand: string;
  setSelectedBrand: (b: string) => void;
  resetFilters: () => void;
  
  // Navigation View
  currentView: 'home' | 'search' | 'cart' | 'orders' | 'deals';
  setCurrentView: (v: 'home' | 'search' | 'cart' | 'orders' | 'deals') => void;

  // Modals & Drawers
  activeProductDetail: Product | null;
  setActiveProductDetail: (p: Product | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  locationModalOpen: boolean;
  setLocationModalOpen: (open: boolean) => void;
  departmentDrawerOpen: boolean;
  setDepartmentDrawerOpen: (open: boolean) => void;
  activeTrackOrder: Order | null;
  setActiveTrackOrder: (o: Order | null) => void;

  // Cart & Saved
  cart: CartItem[];
  savedForLater: SavedItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleGift: (productId: string) => void;
  saveItemForLater: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // User & Auth
  user: User | null;
  login: (email: string, name?: string, prime?: boolean) => void;
  logout: () => void;
  togglePrimeMembership: () => void;
  activeAddress: Address;
  setActiveAddress: (addr: Address) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;

  // Orders
  orders: Order[];
  placeOrder: (shippingSpeed: 'standard' | 'two-day' | 'one-day', paymentMethod: string) => Order;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Browsing History & Recommendations
  browsingHistory: Product[];
  clearBrowsingHistory: () => void;
  recommendedProducts: Product[];
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Alex Morgan',
    street: '420 Lexington Avenue, Apt 18B',
    city: 'New York',
    state: 'NY',
    zipCode: '10170',
    country: 'United States',
    phone: '(212) 555-0199',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Alex Morgan (Office)',
    street: '111 8th Avenue, Floor 4',
    city: 'New York',
    state: 'NY',
    zipCode: '10011',
    country: 'United States',
    phone: '(212) 555-0144',
    isDefault: false
  }
];

const DEFAULT_USER: User = {
  id: 'usr-alex-morgan',
  name: 'Alex Morgan',
  email: 'alex.morgan@amazon.com',
  primeMember: true,
  avatar: 'AM',
  addresses: DEFAULT_ADDRESSES
};

const DEFAULT_ORDERS: Order[] = [
  {
    id: '114-8923419-7482610',
    date: 'October 28, 2026',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Echo Studio
        quantity: 1,
        selectedColor: 'Charcoal Mesh'
      }
    ],
    subtotal: 99.99,
    shipping: 0,
    tax: 8.87,
    total: 108.86,
    status: 'Delivered',
    deliveryDate: 'October 30, 2026',
    shippingSpeed: 'two-day',
    shippingAddress: DEFAULT_ADDRESSES[0],
    paymentMethod: 'Amazon Prime Rewards Visa ending in 4092',
    trackingNumber: 'TBA940182910482',
    trackingSteps: [
      { status: 'Ordered', date: 'Oct 28', time: '11:24 AM', location: 'Amazon Fulfillment Center, PA', completed: true },
      { status: 'Shipped', date: 'Oct 29', time: '04:15 AM', location: 'Carrier Sort Facility, NJ', completed: true },
      { status: 'Out for delivery', date: 'Oct 30', time: '07:30 AM', location: 'New York, NY', completed: true },
      { status: 'Delivered', date: 'Oct 30', time: '01:45 PM', location: 'Front Door / Porch', completed: true }
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [sortBy, setSortBy] = useState('featured');
  const [primeOnly, setPrimeOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'cart' | 'orders' | 'deals'>('home');

  // Modals & Drawers
  const [browsingHistory, setBrowsingHistory] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_clone_browsing_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('amazon_clone_browsing_history', JSON.stringify(browsingHistory));
  }, [browsingHistory]);

  const [activeProductDetail, setActiveProductDetailState] = useState<Product | null>(null);

  const setActiveProductDetail = (p: Product | null) => {
    setActiveProductDetailState(p);
    if (p) {
      setBrowsingHistory(prev => {
        const filtered = prev.filter(item => item.id !== p.id);
        return [p, ...filtered].slice(0, 15);
      });
    }
  };

  const clearBrowsingHistory = () => {
    setBrowsingHistory([]);
    localStorage.removeItem('amazon_clone_browsing_history');
    showToast('Browsing history cleared', 'info');
  };

  const recommendedProducts = React.useMemo(() => {
    if (browsingHistory.length === 0) {
      return products.filter(p => p.bestSeller || p.rating >= 4.7).slice(0, 4);
    }
    const viewedCategories = new Set(browsingHistory.map(p => p.category));
    const viewedBrands = new Set(browsingHistory.map(p => p.brand));
    const viewedIds = new Set(browsingHistory.map(p => p.id));

    const scored = products
      .filter(p => !viewedIds.has(p.id))
      .map(p => {
        let score = 0;
        if (viewedBrands.has(p.brand)) score += 4;
        if (viewedCategories.has(p.category)) score += 2;
        score += p.rating * 0.1;
        return { product: p, score };
      })
      .sort((a, b) => b.score - a.score);

    const matches = scored.map(s => s.product);
    if (matches.length < 4) {
      const rest = products.filter(p => !viewedIds.has(p.id) && !matches.includes(p));
      return [...matches, ...rest].slice(0, 4);
    }
    return matches.slice(0, 4);
  }, [products, browsingHistory]);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [departmentDrawerOpen, setDepartmentDrawerOpen] = useState(false);
  const [activeTrackOrder, setActiveTrackOrder] = useState<Order | null>(null);

  // Cart & Saved State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_clone_cart');
      return saved ? JSON.parse(saved) : [
        { product: INITIAL_PRODUCTS[1], quantity: 1, selectedColor: 'Black' } // Kindle Paperwhite in cart by default
      ];
    } catch {
      return [{ product: INITIAL_PRODUCTS[1], quantity: 1, selectedColor: 'Black' }];
    }
  });

  const [savedForLater, setSavedForLater] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_clone_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User State with LocalStorage
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('amazon_clone_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [activeAddress, setActiveAddress] = useState<Address>(() => {
    if (user && user.addresses.length > 0) {
      return user.addresses.find(a => a.isDefault) || user.addresses[0];
    }
    return DEFAULT_ADDRESSES[0];
  });

  // Orders State with LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_clone_orders');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('amazon_clone_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amazon_clone_saved', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('amazon_clone_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('amazon_clone_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('amazon_clone_orders', JSON.stringify(orders));
  }, [orders]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setPrimeOnly(false);
    setMinRating(0);
    setPriceRange([0, 2500]);
    setSelectedBrand('All');
    setSortBy('featured');
    setSearchQuery('');
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          selectedColor: color || next[existingIndex].selectedColor,
          selectedSize: size || next[existingIndex].selectedSize
        };
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    showToast(`Added "${product.title.slice(0, 32)}..." to your cart`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(item => item.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.title.slice(0, 30)}..." from cart`, 'info');
    }
  };

  const toggleGift = (productId: string) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, isGift: !item.isGift } : item));
  };

  const saveItemForLater = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if (!item) return;
    setCart(prev => prev.filter(i => i.product.id !== productId));
    setSavedForLater(prev => [
      ...prev.filter(s => s.product.id !== productId),
      { product: item.product, dateAdded: new Date().toLocaleDateString() }
    ]);
    showToast(`Saved "${item.product.title.slice(0, 28)}..." for later`, 'info');
  };

  const moveToCartFromSaved = (productId: string) => {
    const item = savedForLater.find(s => s.product.id === productId);
    if (!item) return;
    setSavedForLater(prev => prev.filter(s => s.product.id !== productId));
    addToCart(item.product, 1);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // User & Auth actions
  const login = (email: string, name?: string, prime = true) => {
    const userName = name || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase());
    const newUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name: userName,
      email,
      primeMember: prime,
      avatar: userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      addresses: DEFAULT_ADDRESSES
    };
    setUser(newUser);
    setActiveAddress(DEFAULT_ADDRESSES[0]);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${userName}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of Amazon account', 'info');
  };

  const togglePrimeMembership = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const updated = { ...user, primeMember: !user.primeMember };
    setUser(updated);
    showToast(
      updated.primeMember ? 'Prime membership activated! Free 2-Day Shipping enabled.' : 'Prime membership paused.',
      updated.primeMember ? 'success' : 'info'
    );
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addr,
      id: 'addr-' + Date.now()
    };
    if (user) {
      const updatedUser = {
        ...user,
        addresses: [...user.addresses, newAddress]
      };
      setUser(updatedUser);
    }
    setActiveAddress(newAddress);
    showToast(`Shipping address for ${newAddress.name} saved!`);
  };

  // Place Order
  const placeOrder = (shippingSpeed: 'standard' | 'two-day' | 'one-day', paymentMethod: string): Order => {
    const subtotal = cartSubtotal;
    const shipping = (user?.primeMember || subtotal >= 35 || shippingSpeed === 'standard') ? 0 : 7.99;
    const tax = Math.round(subtotal * 0.08875 * 100) / 100;
    const total = Math.round((subtotal + shipping + tax) * 100) / 100;

    const deliveryDays = shippingSpeed === 'one-day' ? 1 : shippingSpeed === 'two-day' ? 2 : 4;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + deliveryDays);
    const deliveryDateStr = targetDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    const now = new Date();
    const orderId = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`;

    const newOrder: Order = {
      id: orderId,
      date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      shipping,
      tax,
      total,
      status: 'Ordered',
      deliveryDate: deliveryDateStr,
      shippingSpeed,
      shippingAddress: activeAddress,
      paymentMethod,
      trackingNumber: `TBA${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      trackingSteps: [
        { status: 'Ordered', date: 'Today', time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), location: 'Amazon Fulfillment Center', completed: true },
        { status: 'Shipped', date: 'Tomorrow', time: 'Expected 08:00 AM', location: 'Carrier Sort Facility', completed: false },
        { status: 'Out for delivery', date: deliveryDateStr, time: 'Expected 09:00 AM', location: `${activeAddress.city}, ${activeAddress.state}`, completed: false },
        { status: 'Delivered', date: deliveryDateStr, time: 'By 8:00 PM', location: 'Delivery address', completed: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setCheckoutModalOpen(false);
    setCurrentView('orders');
    showToast(`Order placed successfully! Order #${newOrder.id}`, 'success');
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        products,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        primeOnly,
        setPrimeOnly,
        minRating,
        setMinRating,
        priceRange,
        setPriceRange,
        selectedBrand,
        setSelectedBrand,
        resetFilters,
        currentView,
        setCurrentView,
        activeProductDetail,
        setActiveProductDetail,
        authModalOpen,
        setAuthModalOpen,
        cartDrawerOpen,
        setCartDrawerOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        locationModalOpen,
        setLocationModalOpen,
        departmentDrawerOpen,
        setDepartmentDrawerOpen,
        activeTrackOrder,
        setActiveTrackOrder,
        cart,
        savedForLater,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleGift,
        saveItemForLater,
        moveToCartFromSaved,
        clearCart,
        cartCount,
        cartSubtotal,
        user,
        login,
        logout,
        togglePrimeMembership,
        activeAddress,
        setActiveAddress,
        addAddress,
        orders,
        placeOrder,
        toasts,
        showToast,
        dismissToast,
        browsingHistory,
        clearBrowsingHistory,
        recommendedProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
