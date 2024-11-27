"use client";
// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearch } from '../../../context/SearchContext'; // Importa el hook useSearch

const Navbar = () => {
  const { sku, setSku } = useSearch(); // Obtén el sku y setSku del contexto
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (sku) {
      router.push(`/search?sku=${sku}`);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="/" className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
          
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dotu Pets</span>
        </Link>

        <div className="flex flex-1 justify-center items-center">
          <div className="relative w-full max-w-md">
            <form onSubmit={handleSearch} className="flex items-center border rounded-lg overflow-hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input 
                type="text" 
                id="search-navbar" 
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border-0 rounded-lg bg-gray-50 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500"
                placeholder="Buscar..." 
              />
              <button 
                type="submit"
                className="bg-purple-900 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 transition"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>

        <div className=" hidden md:flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Buscar</span>
          </button>
          <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex md:space-x-8 md:flex-row md:order-1">
          <li>
            <a href="#" className="block py-2 px-3 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 md:dark:text-purple-500" aria-current="page">Inicio</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 md:dark:hover:text-purple-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Alimentos</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Medicamentos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

