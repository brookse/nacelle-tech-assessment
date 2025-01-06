import React from 'react';

interface SearchResultProps {
  id: string;
  title: string;
  category: string;
}

export const SearchResult = ({ id, title, category }: SearchResultProps) => {
  return (
    <div key={id} className='p-3 hover:bg-pink-50 cursor-pointer border-b border-stone-200 last:border-b-0'>
      <h1 className='font-semibold' dangerouslySetInnerHTML={{__html: title}}></h1>
      <p className='text-stone-500'>{category}</p>
    </div>
  );
};