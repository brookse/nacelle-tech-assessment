'use client'
import React, { useState } from "react";
import seedData from '../../seed.json';
import { Modal } from "./Modal/Modal";

const productCategories = ['Chocolate', 'Hard Candy', 'Gummy', 'Salt Water Taffy']; 
type ProductCategory = (typeof productCategories)[number];
type Product = {
  id: string;
  title: string;
  category: string;
}

export default function ModalPage() {
  const [modalCategory, setModalCategory] = useState<ProductCategory>();
  const [activeProducts, setActiveProducts] = useState<Product[]>([]);
  const products = seedData as Product[];

  const onCategorySelect = (category: ProductCategory) => {
    const filteredProducts = products.filter((product) => product.category === category);
    setActiveProducts(filteredProducts);
    setModalCategory(category);
  }

  const onModalClose = () => {
    setModalCategory(undefined);
    setActiveProducts([]);
  }

  return (
    <main className="flex flex-col items-start w-full">
      <h1 className="text-stone-700 text-2xl font-bold pb-4">Lyzzi&apos;s Candy Store</h1>

      <div className='w-full gap-2 flex justify-between flex-wrap'>
        { productCategories.map((category) => (
          <button key={category} className='px-3 py-6 w-1/5 min-w-full sm:min-w-[150px] transition-all bg-white hover:bg-pink-500 hover:text-white hover:shadow-md cursor-pointer border rounded-2xl text-pink-500 text-center font-semibold' onClick={() => onCategorySelect(category)}>
            {category}
          </button>
        ))}
      </div>

      <Modal isOpen={!!modalCategory} onClose={onModalClose} title={modalCategory as string}>
        <div className='grid grid-cols-1 gap-6'>
          { activeProducts.map((product) => (
            <div key={product.id} className='flex justify-between items-center'>
              <h1 className='text-stone-700'>{product.title}</h1>
              <button className='px-2 py-1 bg-pink-400 hover:bg-pink-500 text-white text-sm rounded-lg hover:shadow-md' onClick={onModalClose}>Add to Cart</button>
            </div>
          ))}
        </div>
      </Modal>
    </main>
  );
}
