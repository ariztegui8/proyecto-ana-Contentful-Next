import sgMail from '@sendgrid/mail';

export default async (req, res) => {
  const { to, from, subject, text, attachments } = req.body;

  sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

  const msg = {
    to,
    from,
    subject,
    text,
    attachments,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ error: 'Error sending email' });
  }
};
