import React, { useEffect, useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const DEBOUNCE_TIMER = 300;

function useDebounce(value: string | undefined): string | undefined {
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DEBOUNCE_TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}

export const Searchbar = ({ onSearch, placeholder }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchValue = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedSearchValue) onSearch(debouncedSearchValue);
    else onSearch('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  return (
    <div className='w-full'>
      <input
        type="search"
        className='px-3 py-2 w-full rounded-xl outline-none border border-stone-400 focus:border-pink-400 text-black'
        placeholder={placeholder || 'Search...'}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};