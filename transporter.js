const { createTransport } = require('nodemailer');
const transporter = createTransport(
  {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.AUTOMAILER_BDD_COM_USERNAME,
      pass: process.env.AUTOMAILER_BDD_COM_PASSWORD
    }
  },
  {
    from: `BigDevDog.com automailer <${process.env.AUTOMAILER_BDD_COM_USERNAME}>`,
    to: process.env.DEVIN_BDD_COM_EMAIL,
    subject: 'Someone has reached out via the Contact Form on BigDevDog.com!'
  }
);

module.exports = transporter;
