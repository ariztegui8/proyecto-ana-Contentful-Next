import multer from 'multer';

// Configuración de Multer
const upload = multer().single('file'); // 'file' es el nombre del campo de entrada del formulario

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        console.error('Error al cargar el archivo:', err);
        res.status(500).json({ error: 'Error al cargar el archivo' });
        return reject();
      }

      // Obtén la información del archivo cargado
      const file = req.file;

      // Realiza alguna acción adicional con el archivo cargado, como adjuntarlo al correo electrónico

      // Envía la respuesta al cliente
      res.status(200).json({ message: 'Archivo cargado exitosamente' });
      resolve();
    });
  });
}
