"use client"
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '../../components/components/primer';

const SearchPage: React.FC = () => {
  return (
    <div id='maincontentsearch' className='min-h-screen container mx-auto p-4'>
      <Suspense fallback={<div>Loading products...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
};

const SearchContent: React.FC = () => {
  const searchParams = useSearchParams();
  const sku = searchParams.get('sku') || '';

  return (
    <>
      {sku ? (
        <ProductList sku={sku} />
      ) : (
        <p>No se ha proporcionado un SKU.</p>
      )}
    </>
  );
};

export default SearchPage;
