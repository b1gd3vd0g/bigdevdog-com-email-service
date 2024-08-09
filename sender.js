const { buildContactFormEmail } = require('./builder');
const { validateAll } = require('./validators');

const rv = (status, info) => {
  return {
    status: status,
    info: info
  };
};

const sendContactFormEmail = async (name, email, phone, header, message) => {
  const validation = validateAll(name, email, phone, header, message);
  if (!validation.valid) {
    return rv(400, { probs: validation.probs });
  }
  const transporter = require('./transporter');
  const v = validation.values;
  const builtEmail = buildContactFormEmail(
    v.name,
    v.email,
    v.phone,
    v.header,
    v.message
  );
  try {
    const delivery = await transporter.sendMail(builtEmail);
    return rv(200, { delivery: delivery });
  } catch (error) {
    return rv(500, { error: error });
  }
};

module.exports = { sendContactFormEmail };
