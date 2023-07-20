import Drawer from './Drawer'
import { CarrouselProvider } from './context/CarrouselProvider';
import { ProductProvider } from './context/ProductProvider'
import './globals.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CarrouselProvider>
        <ProductProvider>
          <body>
            <Drawer />
            {children}
          </body>
        </ProductProvider>
      </CarrouselProvider>
    </html>
  )
}
