import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Define the expected structure of the data
interface Price {
  tienda: string;
  price: number;
  stock: number;
  link: string;
}

interface Product {
  sku: string;
  name: string;
  description: string;
  category: string;
  marca: string;
  prices: Price[];
}

interface ProductListProps {
  sku: string;
}

const ProductList: React.FC<ProductListProps> = ({ sku }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dotupetpublic-production.up.railway.app/product/${sku}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [sku]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">No product data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3 flex justify-center">
          <Image
            src="https://drive.google.com/uc?export=view&id=1iE3-D2Z0Fpc99dQ3MXdLAEcvFs3604ZM" 
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <div className="lg:w-2/3 lg:pl-8 mt-6 lg:mt-0">
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          <p className="mt-2 text-gray-400">Category: {product.category}</p>
          <p className="mt-2 text-gray-400">Brand: {product.marca}</p>
          <h2 className="mt-4 text-xl font-semibold text-white">Prices</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.prices.map((price, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between"
              >
                <a
                  href={price.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-400 font-medium"
                >
                  {price.tienda}
                </a>
                <p className="text-white mt-2">${price.price}</p>
                <p className="text-gray-400">Stock: {price.stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
