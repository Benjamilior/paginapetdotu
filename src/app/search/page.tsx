"use client"
// src/app/search/page.tsx
import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '../components/primer';

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sku = searchParams.get('sku') || ''; // Obtener el SKU de los parámetros de búsqueda

  return (
    <div>
      {sku ? (
        <ProductList sku={sku} /> // Pasar el SKU al componente ProductList
      ) : (
        <p>No se ha proporcionado un SKU.</p>
      )}
      <button
        onClick={() => window.location.href = '/'}
        className="mt-4 p-2 bg-green-500 text-white"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default SearchPage;
