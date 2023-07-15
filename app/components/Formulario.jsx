import React, { useContext, useState } from 'react';
import ProductContext from '../context/ProductProvider';

const Formulario = () => {
  const { cv, handleCv, handleSubmitCv, alert , handleArchivo} = useContext(ProductContext);

  const { nombre, apellido, email, linkedin, pais, telefono } = cv;

  return (
    <form
      className="flex justify-center flex-1 w-full"
      onSubmit={handleSubmitCv}
      encType="multipart/form-data"
    >
      <div className="card w-80 sm:w-3/4 bg-base-100 border-2 border-[#ECEDFD]">
        <div className="card-body p-4 md:p-8 bg-gray-50">
          <div className="mb-3 max-w-xl">
            <p className="font-bold mb-4">Datos personales</p>
            <input
              type="text"
              placeholder="Nombre"
              className="input input-bordered w-full mb-4"
              name="nombre"
              onChange={handleCv}
              value={nombre}
            />
            <input
              type="text"
              placeholder="Apellido"
              className="input input-bordered w-full mb-4"
              name="apellido"
              onChange={handleCv}
              value={apellido}
            />

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              name="email"
              onChange={handleCv}
              value={email}
            />
          </div>

          <div className="mb-3 max-w-xl">
            <p className="font-bold mb-4">Curriculum</p>

            <input
              type="text"
              placeholder="Perfil de Linkedin"
              className="input input-bordered w-full mb-4"
              name="linkedin"
              onChange={handleCv}
              value={linkedin}
            />

            <input
              type="text"
              placeholder="Pais"
              className="input input-bordered w-full mb-4"
              name="pais"
              onChange={handleCv}
              value={pais}
            />

            <input
              type="tel"
              placeholder="Telefono"
              className="input input-bordered w-full mb-4"
              name="telefono"
              onChange={handleCv}
              value={telefono}
            />
          </div>

          <div className="mb-3 max-w-xl">
            <p className="font-bold mb-4">Curriculum</p>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="file"
              onChange={handleArchivo}
            />
          </div>

          <div className='mb-3 flex justify-end'>
            <button type='submit' className="btn btn-success">Enviar</button>
          </div>

          {alert ?
            <div className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Tu email se ha enviado correctamente</span>
            </div> :
            ''
          }
        </div>
      </div>
    </form>
  );
};

export default Formulario;
