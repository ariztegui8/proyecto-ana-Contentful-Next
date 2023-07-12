/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      MAX_FILE_SIZE: '10mb', // Ajusta el límite de tamaño de archivo según tus necesidades
    },
    serverRuntimeConfig: {
      // Configura el límite de carga útil a 50MB
      maxBodySize: '50mb',
    },
  };
  
  module.exports = nextConfig;
