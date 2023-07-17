import nodemailer from 'nodemailer';
import { withFileUpload, getConfig } from 'next-multiparty';

export const config = getConfig()

export default withFileUpload(async (req, res) => {
    res.json({ test: 1 })


    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { nombre, apellido, email, linkedin, pais, telefono, titulo } = req.fields;
    const files = req.files;
    console.log(req.fields);
    console.log(files);

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'team.ariztegui@gmail.com',
                pass: 'aauexyqdxhbseefu',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const correoElectronico = {
            from: 'team.ariztegui@gmail.com',
            to: 'jorgeariztegui8@gmail.com',
            subject: 'Solicitud de Empleo - Nuevo CV recibido',
            html: `

            <p><strong>Título de la Vacante:</strong> ${titulo}</p>
            <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Perfil de Linkedin:</strong> ${linkedin}</p>
            <p><strong>País:</strong> ${pais}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
          `,
            attachments: [
                {
                    filename: files[0].originalFilename,
                    path: files[0].filepath,
                    contentType: files[0].mimetype,
                },
            ],
        };

        await transporter.sendMail(correoElectronico);

        return res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return res.status(500).json({ message: 'Error al enviar el correo electrónico' });
    }
})
