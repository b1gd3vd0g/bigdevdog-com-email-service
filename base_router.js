const { sendContactFormEmail } = require('./sender');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const header = req.body.header;
  const message = req.body.message;
  const delivery = await sendContactFormEmail(
    name,
    email,
    phone,
    header,
    message
  );
  return res.status(delivery.status).json(delivery.info);
});

module.exports = router;
