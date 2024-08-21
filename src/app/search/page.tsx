// src/app/page.tsx

"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProductList from '../components/primer';

const App: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div>
      <ProductList sku="petdotu5" />
      <button
        onClick={handleGoHome}
        className="mt-4 p-2 bg-green-500 text-white"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default App;
