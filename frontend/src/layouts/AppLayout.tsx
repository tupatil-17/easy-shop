import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'sonner';

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default React.memo(AppLayout);
