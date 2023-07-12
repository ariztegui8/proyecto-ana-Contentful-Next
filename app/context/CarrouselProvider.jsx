import { createContext, useEffect, useState } from "react"
import { createClient } from 'contentful';

const CarrouselContext = createContext()

const CarrouselProvider = ({children}) => {

    const [slider, setSlider] = useState([])

    const client = createClient({
        space: '85iynf6xw7x7',
        accessToken: 'TN9HVY7Wu8NIDBpO3NE6C3jH3MUPl_fHXd6-3L9E3sE'
    })

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