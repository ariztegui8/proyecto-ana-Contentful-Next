import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, apellido, email, linkedin, pais, telefono, archivo } = req.body;

    console.log(nombre);
    console.log(apellido);
    console.log(archivo);

    const apiKey = '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';

    sgMail.setApiKey(apiKey);

    const msg = {
      to: 'jorgeariztegui8@gmail.com',
      from: 'jorge.ariztegui@getfridom.com',
      subject: 'Nuevo formulario de CV',
      text: `
        Se ha recibido un nuevo formulario de CV. Aquí están los detalles:

        Nombre: ${nombre}
        Apellido: ${apellido}
        Email: ${email}
        LinkedIn: ${linkedin}
        País: ${pais}
        Teléfono: ${telefono}
        Curriculum: ${archivo}
      `,
      attachments: [], 
    };

    if (req.files && req.files.file) {
      const file = req.files.file;

      // Agrega el archivo adjunto al mensaje
      msg.attachments.push({
        content: file.data.toString('base64'),
        filename: file.name,
        type: file.mimetype,
        disposition: 'attachment',
      });
    }

    try {
      await sgMail.send(msg);
      console.log('El correo electrónico se ha enviado correctamente');
      res.status(200).json({ message: 'El correo electrónico se ha enviado correctamente' });
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).json({ error: 'Error al enviar el correo electrónico' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
