import { createContext, useEffect, useState } from "react"
import { createClient } from 'contentful';

const CarrouselContext = createContext()

const CarrouselProvider = ({children}) => {

    const [slider, setSlider] = useState([])

   const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCES_TOKEN,
  });

    useEffect(() => {
        const consultarApi = async () => {
            try {
                const res = await client.getEntries({
                    content_type: 'carrousel'
                })
                setSlider(res.items)
                // await client.getEntries().then(entries =>{
                //     setCards(entries.items)
                // })
            } catch (error) {
                console.log(error);
            }
        }
        consultarApi()
    }, [])

    return(
        <CarrouselContext.Provider
            value={{
                slider
            }}
        >
            {children}
        </CarrouselContext.Provider>
    )
}

export{
  CarrouselProvider
}

export default CarrouselContext