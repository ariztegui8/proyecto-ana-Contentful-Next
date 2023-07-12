import { useContext } from "react"
import CarrouselContext from "../context/CarrouselProvider"


const useCarrousel = () => {
  return useContext(CarrouselContext)
}

export default useCarrousel