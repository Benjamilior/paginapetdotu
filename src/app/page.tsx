// src/app/page.tsx
import ProductList from './components/primer';
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [sku, setSku] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (sku) {
      router.push(`/search?sku=${sku}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Buscar Producto</h1>
      <form onSubmit={handleSearch} className="mt-4">
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Ingrese SKU"
          className="border p-2 text-gray-900"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2"
        >
          Buscar
        </button>
        {/* Mostrar el valor del SKU dentro del formulario */}
        <div className="mt-2" >
          <p>SKU ingresado: <strong>{sku}</strong></p>
        </div>
      </form>
    </div>
  );
};

export default Home;
