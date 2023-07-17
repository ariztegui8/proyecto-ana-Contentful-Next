import React, { useContext, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

const Formulario = ({ title }) => {

  const [alert, setAlert] = useState(false);
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(false)
  const [cv, setCv] = useState({
    nombre: '',
    apellido: '',
    email: '',
    linkedin: '',
    pais: '',
    telefono: '',
    titulo: title
  });

  const { nombre, apellido, email, linkedin, pais, telefono, titulo } = cv

  const handleCv = e => {
    setCv({
      ...cv,
      [e.target.name]: e.target.value
    });
  };

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  const handleSubmitCv = async (e) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("archivo", archivo);
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("email", email);
      formData.append("linkedin", linkedin);
      formData.append("pais", pais);
      formData.append("telefono", telefono);
      formData.append("titulo", titulo);
      const response = await axios.post('/api/nodeMailer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if ([archivo, nombre, apellido, email, linkedin, pais, telefono].includes('')) {
        setError(true)
        setTimeout(() => {
          setError(false);
        }, 3000);
        return;
      }

      if (response.status === 200) {
        console.log(archivo);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          router.push('/');
        }, 2500);
        console.log('Correo electrónico enviado correctamente');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }

  };


  const router = useRouter();

  return (
    <form
      className="flex justify-center flex-1 w-full"
      onSubmit={handleSubmitCv}
      encType="multipart/form-data"
    >
      <div className="card w-full bg-base-100 border-2 border-[#ECEDFD]">
        <div className="card-body p-4 md:p-8 bg-gray-50 items-center ">
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

            <input
              type="tel"
              placeholder="Telefono"
              className="input input-bordered w-full mb-4"
              name="telefono"
              onChange={handleCv}
              value={telefono}
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
              type="text"
              placeholder="Perfil de Linkedin"
              className="input input-bordered w-full mb-4"
              name="linkedin"
              onChange={handleCv}
              value={linkedin}
            />

          </div>

          <div className="mb-6 max-w-xl w-full">
            <p className="font-bold mb-4">Curriculum</p>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="file"
              onChange={handleArchivo}
            />
          </div>

          {error ?
            <div className="alert alert-error mb-2 max-w-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Todos los campos son obligatorios</span>
            </div> :
            ''
          }

          {alert ?
            <div className="alert alert-success mb-2 max-w-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Tu email se ha enviado correctamente</span>
            </div> :
            ''
          }

          <div className='mb-3 flex justify-center w-full'>
            <button type='submit' className="btn btn-success w-full md:w-auto">Enviar</button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default Formulario;
