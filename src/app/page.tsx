// src/app/page.tsx
"use client";
import ProductList from '../components/components/primer';
import {WobbleCardDemo} from '../components/components/newsforprincipal';
import {AppleCardsCarouselDemo} from '../components/components/newsforcell';
import HomePageHero from '../components/components/searchinicio';
import { Search } from  "../components/components/Search"



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
      <HomePageHero></HomePageHero> 
      <Search></Search>
      <div className="hidden xl:block 2xl:block">
        <WobbleCardDemo />
      </div>
      <h2 className='block md:hidden text-2xl font-bold text-indigo-50 dark:text-neutral-200 font-sans'>
        Noticias</h2>
      
      <div className=" md: lg:block xl:hidden 2xl:hidden">
        <AppleCardsCarouselDemo />
      </div>


    </div>
  );
};

export default Home;
