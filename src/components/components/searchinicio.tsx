import React, { useState, FormEvent } from 'react'
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation';
import { useSearch } from '../../../context/SearchContext'

const HomePageHero: React.FC = () => {
  const {sku, setSku} = useSearch();
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sku) {
      router.push(`/search?sku=${sku}`)
    }
  }

  return (
   < div id="containt2" className="min-h-1/2  m-40 flex flex-col items-center justify-center bg-[#1a0140] text-white p-4 overflow-hidden ">
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
          Bienvenido a Nuestro Cotizador
        </h1>
        <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up animation-delay-500">
          Encuentra rápidamente el producto para tu mascota al mejor precio 
        </p>
        <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up animation-delay-500 colo">
          Prueba por ejemplo: Acana Wild Atlantic        </p>
        
        {/* <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-1000">
          <input
            type="text"
            placeholder="Ingrese SKU del Producto"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="flex-grow text-lg py-6 px-4 rounded-full bg-white/20 border-2 border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-white text-[#1a0140] hover:bg-white/90 rounded-full text-lg py-6 px-8 flex items-center justify-center transition-all duration-300"
          >
            <Search className="w-6 h-6 mr-2" />
            Buscar
          </button>
        </form> */}
      </div>
    </div>
  )
}

export default HomePageHero