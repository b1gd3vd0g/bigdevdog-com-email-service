const { buildContactFormEmail, buildConfirmationEmail } = require('./builder');
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
    if (delivery.accepted.length) {
      // The message was built successfully!!
      const builtConfirmation = buildConfirmationEmail(
        v.name,
        v.email,
        v.phone,
        v.header,
        v.message
      );
      const transporter2 = require('./transporter');
      try {
        await transporter2.sendMail({
          ...builtConfirmation,
          to: v.email,
          subject: 'Your email has been sent successfully from BigDevDog.com.'
        });
        return rv(200, {
          message: 'Contact email and confirmation have been sent successfully.'
        });
      } catch (error) {
        return rv(207, {
          message:
            `Contact email was sent successfully, but a confirmation ` +
            `email could not be sent to the provided address ${v.email}. If this ` +
            `address is incorrect, please resubmit your message. If this address ` +
            `is correct, you can expect a response within 2 days.`
        });
      }
    }
    return rv(500, { message: 'Message was not sent for an unknown reason.' });
  } catch (error) {
    return rv(500, { error: error });
  }
};
module.exports = { sendContactFormEmail };
