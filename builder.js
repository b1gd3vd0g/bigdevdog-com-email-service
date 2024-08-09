const buildContactFormEmail = (name, email, phone, header, message) => {
  const cid = 'bdd-logo-celadon';
  // replace all \n with <br /> for better formatted html
  const htmlMessage = message.replace(/\n/g, '<br />');

  const htmlBody = `
    <h4>Sender information</h4>
    <ul>
        <li>Name: ${name}</li>
        <li>email: ${email}</li>
        <li>number: ${phone}</li>
      </ul>
      <h4>${header}</h4>
      <p>${htmlMessage}</p>
      <br />
      <img src="cid:${cid}" style="width: 50vw; margin: 2vw auto; display: block" />
      <br />
      <small>Please do not respond to this email.</small>`;

  const plainTextBody = `
    From: ${name}\n
    Email: ${email}\n
    Number: ${phone}\n
    Header: ${header}\n
    Subject: ${message}.\n\n
    Please do not respond to this email.`;

  return {
    text: plainTextBody,
    html: htmlBody,
    attachments: [
      {
        filename: 'bigdevdog_logo.png',
        path: './img/logo_trans_celadon.png',
        cid: cid
      }
    ]
  };
};

module.exports = {
  buildContactFormEmail
};
