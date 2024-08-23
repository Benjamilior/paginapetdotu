"use client"
// src/app/search/page.tsx
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '../components/primer';

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sku = searchParams.get('sku') || ''; // Obtener el SKU de los parámetros de búsqueda

  return (
    <div id='maincontentsearch' className='min-h-screen container mx-auto p-4'>
      {sku ? (
        <ProductList sku={sku} /> // Pasar el SKU al componente ProductList
      ) : (
        <p>No se ha proporcionado un SKU.</p>
      )}
      
    </div>
  );
};

export default SearchPage;
