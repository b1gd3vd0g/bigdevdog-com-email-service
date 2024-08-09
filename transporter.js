const { createTransport } = require('nodemailer');
const transporter = createTransport({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: true,
  auth: {
    user: ENV.AUTOMAILER_BDD_COM_USERNAME,
    pass: ENV.AUTOMAILER_BDD_COM_PASSWORD
  }
});

module.exports = transporter;
