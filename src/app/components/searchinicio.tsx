import React, { useState, FormEvent } from 'react'
import { Search } from "lucide-react"

const HomePageHero: React.FC = () => {
  const [sku, setSku] = useState<string>('')

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for SKU:', sku)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a0140] text-white p-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
          Bienvenido a Nuestro Catálogo
        </h1>
        <p className="text-xl sm:text-2xl mb-8 animate-fade-in-up animation-delay-500">
          Encuentra rápidamente el producto que buscas con nuestro buscador de SKU
        </p>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-1000">
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
        </form>
      </div>
    </div>
  )
}

export default HomePageHero