import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import Index from '@/pages/Index';

// Lazy load non-critical routes
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const CollectionPage = lazy(() => import('@/pages/CollectionPage'));
const CollectionsPage = lazy(() => import('@/pages/CollectionsPage'));
const OrderConfirmation = lazy(() => import('@/pages/OrderConfirmation'));
const AdminAuth = lazy(() => import('@/pages/AdminAuth'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background">
    <div className="relative mb-8">
      <div className="w-12 h-12 border border-foreground/20 animate-pulse" />
      <div className="absolute inset-0 w-12 h-12 border border-foreground animate-ping opacity-20" />
    </div>
    <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">Loading...</p>
  </div>
);

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
              <Suspense fallback={<LoadingFallback />}>
                <CategoryPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/collections"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <CollectionsPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/new-arrivals"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <CollectionPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/best-sellers"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <CollectionPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/sale"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <CollectionPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <OrderConfirmation />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/admin/auth"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <AdminAuth />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <AdminDashboard />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
