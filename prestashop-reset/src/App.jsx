import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, CartProvider, useAuth } from './contexts';
import EntryPage from './pages/EntryPage';
import LoginPage from './pages/LoginPage';
import FrontLoginPage from './pages/FrontLoginPage';
import ResetPage from './pages/ResetPage';
import ImportPage from './pages/ImportPage';
import OrdersAdminPage from './pages/OrdersAdminPage';
import StockAdminPage from './pages/StockAdminPage';
import StatsAdminPage from './pages/StatsAdminPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrdersPage from './pages/MyOrdersPage';

function ProtectedAdminRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function ProtectedFrontRoute({ children }) {
  const { customer } = useAuth();
  return customer ? children : <Navigate to="/front/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/front/login" element={<FrontLoginPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/reset" element={<ProtectedAdminRoute><ResetPage /></ProtectedAdminRoute>} />
      <Route path="/admin/import" element={<ProtectedAdminRoute><ImportPage /></ProtectedAdminRoute>} />
      <Route path="/admin/orders" element={<ProtectedAdminRoute><OrdersAdminPage /></ProtectedAdminRoute>} />
      <Route path="/admin/stocks" element={<ProtectedAdminRoute><StockAdminPage /></ProtectedAdminRoute>} />
      <Route path="/admin/stats" element={<ProtectedAdminRoute><StatsAdminPage /></ProtectedAdminRoute>} />
      
      {/* Front Routes */}
      <Route path="/front" element={<ProtectedFrontRoute><HomePage /></ProtectedFrontRoute>} />
      <Route path="/front/product/:id" element={<ProtectedFrontRoute><ProductPage /></ProtectedFrontRoute>} />
      <Route path="/front/cart" element={<ProtectedFrontRoute><CartPage /></ProtectedFrontRoute>} />
      <Route path="/front/checkout" element={<ProtectedFrontRoute><CheckoutPage /></ProtectedFrontRoute>} />
      <Route path="/front/my-orders" element={<ProtectedFrontRoute><MyOrdersPage /></ProtectedFrontRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
