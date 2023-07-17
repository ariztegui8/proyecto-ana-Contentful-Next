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
        handleChangeSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;