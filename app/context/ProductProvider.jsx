import { createContext, useEffect, useState } from "react";
import { createClient } from 'contentful';



const ProductContext = createContext();

const ProductProvider = ({ children }) => {

  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');


  const results = !search ? cards : cards.filter((dato) => dato.fields.title?.toLowerCase().includes(search.toLowerCase()));

  const handleChangeSearch = e => {
    setSearch(e.target.value);
  };

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCES_TOKEN,
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
        handleChangeSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;