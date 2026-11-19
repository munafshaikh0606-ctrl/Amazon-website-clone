import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SubNav } from './components/SubNav';
import { HomeView } from './components/HomeView';
import { SearchResultsView } from './components/SearchResultsView';
import { CartView } from './components/CartView';
import { OrdersView } from './components/OrdersView';
import { DealsView } from './components/DealsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DepartmentDrawer } from './components/DepartmentDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { LocationModal } from './components/LocationModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

const AppContent: React.FC = () => {
  const { currentView, activeProductDetail, setActiveProductDetail } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#e3e6e6] text-[#0f1111]">
      {/* Amazon Navigation Headers */}
      <Header />
      <SubNav />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'search' && <SearchResultsView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'orders' && <OrdersView />}
        {currentView === 'deals' && <DealsView />}
      </main>

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
        />
      )}

      {/* Slide-out & Interactive Drawers/Modals */}
      <DepartmentDrawer />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <LocationModal />

      {/* Toasts Feedback */}
      <ToastContainer />

      {/* Amazon Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
