import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Index from '@/pages/Index';
import CategoryPage from '@/pages/CategoryPage';
import CollectionPage from '@/pages/CollectionPage';
import OrderConfirmation from '@/pages/OrderConfirmation';
import AdminAuth from '@/pages/AdminAuth';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <PageTransition>
              <CategoryPage />
            </PageTransition>
          }
        />
        <Route
          path="/new-arrivals"
          element={
            <PageTransition>
              <CollectionPage />
            </PageTransition>
          }
        />
        <Route
          path="/best-sellers"
          element={
            <PageTransition>
              <CollectionPage />
            </PageTransition>
          }
        />
        <Route
          path="/sale"
          element={
            <PageTransition>
              <CollectionPage />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <OrderConfirmation />
            </PageTransition>
          }
        />
        <Route
          path="/admin/auth"
          element={
            <PageTransition>
              <AdminAuth />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
