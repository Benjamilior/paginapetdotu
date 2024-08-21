import React, { useEffect, useState } from 'react';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Brand: {product.marca}</p>
      <h2>Prices</h2>
      <ul>
        {product.prices.map((price, index) => (
          <li key={index}>
            <a href={price.link} target="_blank" rel="noopener noreferrer">
              {price.tienda}: ${price.price} - Stock: {price.stock}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;