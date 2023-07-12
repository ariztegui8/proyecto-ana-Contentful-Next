"use client"
import Formulario from '@/app/components/Formulario';
import useDefault from '@/app/hooks/useProduct';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductId = () => {
  const { cards } = useDefault();

  const { id } = useParams();

  const product = cards.find((card) => card.sys.id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="card bg-base-100 flex items-center justify-center gap-6 w-full p-8">
      <div className="flex justify-center flex-1 w-full">
        <div className="card w-80  sm:w-3/4 bg-base-100 border-2 border-[#ECEDFD]">
          <div className="card-body p-4 md:p-8 bg-gray-50">
            <h2 className="card-title text-xl font-bold text-custom-black">
              {product.fields.title}
            </h2>
            <p>{product.fields.description}</p>
          </div>
        </div>
      </div>

      <Formulario />
    </div>
  );
};

export default ProductId;
