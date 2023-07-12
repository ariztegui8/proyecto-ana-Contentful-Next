"use client";
import Drawer from './Drawer'
import { CarrouselProvider } from './context/CarrouselProvider';
import { ProductProvider } from './context/ProductProvider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trivago Electronica',
  description: 'Web site Trivago Electronica',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CarrouselProvider>
        <ProductProvider>
          <body className={inter.className}>
            <Drawer />
            {children}
          </body>
        </ProductProvider>
      </CarrouselProvider>
    </html>
  )
}
