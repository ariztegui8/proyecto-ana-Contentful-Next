import { createContext, useEffect, useState } from "react";
import { createClient } from 'contentful';
import { useRouter } from "next/navigation";
import axios from "axios";


const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const [cv, setCv] = useState({
    nombre: '',
    apellido: '',
    email: '',
    linkedin: '',
    pais: '',
    telefono: '',
  });

  const handleCv = e => {
    setCv({
      ...cv,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitCv = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('to', 'jorge.ariztegui@getfridom.com');
    formData.append('from', process.env.SENDGRID_SENDER_EMAIL);
    formData.append('subject', 'Nuevo CV recibido');
    formData.append('text', 'Adjunto encontrarás el CV recibido.');
    formData.append('pdf', pdfFile);
  
    try {
      await axios.post('/api/send-email', formData);
      setAlert(true);
      setCv({
        nombre: '',
        apellido: '',
        email: '',
        linkedin: '',
        pais: '',
        telefono: '',
      });
      setPdfFile(null);
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
    }
  };

  // const router = useRouter();

  const results = !search ? cards : cards.filter((dato) => dato.fields.title?.toLowerCase().includes(search.toLowerCase()));

  const handleChangeSearch = e => {
    setSearch(e.target.value);
  };

  const client = createClient({
    space: '85iynf6xw7x7',
    accessToken: 'TN9HVY7Wu8NIDBpO3NE6C3jH3MUPl_fHXd6-3L9E3sE',
  });

  useEffect(() => {
    const consultarApi = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'card',
        });
        setCards(res.items);
      } catch (error) {
        console.log(error);
      }
    };
    consultarApi();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        cards,
        results,
        cv,
        alert,
        handleCv,
        handleSubmitCv,
        handleChangeSearch,
        setPdfFile 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;