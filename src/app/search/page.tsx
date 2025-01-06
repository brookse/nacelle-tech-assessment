'use client'
import React, { useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { SearchResult } from "./Searchbar/SearchResult";
import seedData from '../../seed.json';

type Product = {
  id: string;
  title: string;
  category: string;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    if (query === "") {
      setSearchTerm("");
      setSearchResults([]);
      return;
    }

    setSearchTerm(query);
    setIsLoading(true);

    // a small timeout to simulate a network request and see the loading state
    setTimeout(() => {
      if (query === 'error') {
        setError('An error occurred, please try again.');
        setSearchResults([]);
        setIsLoading(false);
        return;
      } else setError(null);
  
      const results = seedData.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase());
      }).map((product) => {
          const higlightedText = product.title.replace(new RegExp(query, 'gi'), (match) => `<mark class="bg-pink-200">${match}</mark>`);
          return {...product, title: higlightedText};
      });
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  }

  return (
    <main className="flex flex-col items-start w-full md:w-2/3">
      <h1 className="text-stone-700 pb-4 text-2xl font-bold">Lyzzi&apos;s Candy Store</h1>
      <Searchbar
        onSearch={handleSearch}
        placeholder="Search for your favorite candy"
      />

      <div className={`${searchTerm ? 'block' : 'hidden'} w-full mt-2 bg-white rounded-xl border border-stone-200`}>
        { isLoading && 
          <p className="p-3 text-sm text-stone-400">Loading...</p>
        }
        { !isLoading && error && 
          <p className="p-3 text-sm text-red-400">{error}</p>
        }
        { !isLoading && !error && searchResults.length === 0 && 
          <p className="p-3 text-sm text-stone-400">No products found</p>
          }
        { !isLoading && searchResults.length > 0 && 
          <p className="p-3 text-sm text-stone-400">{`${searchResults.length} product${searchResults.length > 1 ? 's': ''} found`}</p>
        }
      
        <div data-testid="search-results" className={`${searchTerm && !isLoading  && !error ? 'max-h-[50vh]' : 'max-h-0'} animate-fade-in w-full transition-all duration-500 ease-in-out overflow-scroll `}>
          { !isLoading && searchResults.map((product) => (
            <SearchResult key={product.id} id={product.id} title={product.title} category={product.category} />
          ))}
        </div>
      </div>
    </main>
  );
}
