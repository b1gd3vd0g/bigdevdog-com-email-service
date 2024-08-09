/**
 * Takes a string and returns it 'prettier' - that is,
 * extra whitespace between words and along edges is removed.
 * @param {string} input The string to be prettified
 * @returns A prettier version of that string.
 */
const prettify = (input) => {
  const inp = String(input).trim();
  return inp.replace(/\ /g, ' ');
};

/** A very common problem when a non-string or empty string is provided for validation. */
const noVal = { val: '', probs: ['no value provided'] };

/**
 * Validates a string representing a name.
 * @param {string} input The string to test for validity
 * @returns an object [val]: the prettified string, [probs]: an array of problems
 */
const validateName = (input) => {
  // possible errors
  const poss = {
    invChar:
      "input may only include letters (incl. accented) and symbols [.'-]",
    firstLast: 'first and last names are required'
  };
  // prettify
  const name = prettify(input);
  // deal with lack of valid input
  if (!name) return noVal;

  const probs = [];
  // illegal characters
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s.'-]+$/.test(name)) probs.push(poss.invChar);
  // first AND last name
  if (!name.includes(' ')) probs.push(poss.firstLast);
  // return prettier name and array of problems.
  return {
    val: probs.length ? '' : name,
    probs: probs
  };
};

/**
 * Validates a string representing an email address.
 * @param {string} input The string to test for validity
 * @returns an object [val]: the prettified string, [probs]: an array of problems
 */
const validateEmail = (input) => {
  // possible errors
  const poss = {
    noAt: 'email address must separate the prefix and the domain with an @',
    twoAt: 'only one @ allowed',
    invCharP: 'prefix contains illegal characters',
    invCharD: 'domain contains illegal characters',
    edgeSymbP: 'prefix cannot start or end with a symbol',
    edgeSymbD: 'domain cannot start or end with a symbol',
    consecSymb: 'email contains consecutive symbols',
    noDotD: 'domain does not contain any dots'
  };
  // prettify
  const email = prettify(input);
  if (!email) return noVal;

  const probs = [];
  // split pref/dom
  const spl = email.split('@');

  if (spl.length < 2) {
    probs.push(poss.noAt);
  } else if (spl.length > 2) {
    probs.push(poss.twoAt);
  } else {
    // we have a prefix and a domain.
    //proceed to more advanced testing.
    const [prefix, domain] = spl;
    // allowed symbols in dom and pref
    const pSym = '_.-';
    const dSym = '.-';
    // ensure valid chars
    if (!new RegExp(`^[A-Za-z0-9${pSym}]+$`).test(prefix))
      probs.push(poss.invCharP);
    if (!new RegExp(`^[A-Za-z0-9${dSym}]+$`).test(domain))
      probs.push(poss.invCharD);
    // ensure no edge symbols
    if (pSym.includes(prefix[0]) || pSym.includes(prefix[prefix.length - 1]))
      probs.push(poss.edgeSymbP);
    if (dSym.includes(domain[0]) || dSym.includes(domain[domain.length - 1]))
      probs.push(poss.edgeSymbD);
    // ensure no consecutive symbols
    if (/[._-][._-]/.test(email)) probs.push(poss.consecSymb);
    if (!domain.includes('.')) probs.push(poss.noDotD);
  }
  return {
    val: probs.length ? '' : email,
    probs: probs
  };
};

/**
 * Validates a string representing a phone number.
 * @param {string} input The string to test for validity
 * @returns an object [val]: the prettified string, [probs]: an array of problems
 */
const validatePhone = (input) => {
  const poss = {
    tooFew: 'input has too few numbers',
    tooMany: 'input has too many numbers',
    nonAmerican: 'input is not an American phone number'
  };

  if (!(typeof input === 'string') || input === '') return noVal;
  // only take into account the digits.
  const nums = input.replace(/[^0-9]/g, '');

  const probs = [];
  // Warnings will not prevent a request from being sent,
  // but there will be a note on the frontend.
  const warnings = [];

  if (nums.length < 7) probs.push(poss.tooFew);
  if (nums.length > 15) probs.push(poss.tooMany);
  if (nums.length !== 10) warnings.push(poss.nonAmerican);
  // NOTE: this 'formatted' number will only look perfect for american numbers.
  // It should always work though.
  const formatted =
    nums.substring(0, 3) +
    '-' +
    nums.substring(3, 6) +
    '-' +
    nums.substring(6, nums.length);

  return {
    val: probs.length ? '' : formatted,
    probs: probs,
    warnings: warnings
  };
};

/**
 * Validates a string representing a phone number.
 * @param {string} input The string to test for validity
 * @returns an object [val]: the prettified string, [probs]: an array of problems
 */
const validateHeader = (input) => {
  const poss = {
    tooShort: 'input must be longer than 10 characters',
    tooLong: 'input must have less than 100 characters'
  };
  if (!(typeof input === 'string') || !input) return noVal;
  const header = prettify(input);
  const probs = [];
  if (header.length < 10) {
    probs.push(poss.tooShort);
  } else if (header.length > 100) {
    probs.push(poss.tooLong);
  }

  return {
    val: probs.length ? '' : header,
    probs: probs
  };
};

/**
 * Validates a string representing a phone number.
 * @param {string} input The string to test for validity
 * @returns an object [val]: the prettified string, [probs]: an array of problems
 */
const validateMessage = (input) => {
  const poss = {
    tooShort: 'input must be longer than 10 characters',
    tooLong: 'input must have less than 1,000 characters'
  };
  if (!(typeof input === 'string') || !input) return noVal;
  const message = prettify(input);
  const probs = [];
  if (message.length < 10) {
    probs.push(poss.tooShort);
  } else if (message.length > 1_000) {
    probs.push(poss.tooLong);
  }

  return {
    val: probs.length ? '' : message,
    probs: probs
  };
};

/**
 *
 * @param {string} name The name to test for validity
 * @param {string} email The email address to test for validity
 * @param {string} phone The phone number to test for validity
 * @param {string} header The header to test for validity
 * @param {string} message The header to test for validity
 * @returns an object [valid]: boolean and [probs]: an object representing
 *  the problems with incorrect inputs
 */
const validateAll = (name, email, phone, header, message) => {
  const nameVal = validateName(name);
  const emailVal = validateEmail(email);
  const phoneVal = validatePhone(phone);
  const headerVal = validateHeader(header);
  const messageVal = validateMessage(message);
  if (
    nameVal.val &&
    emailVal.val &&
    phoneVal.val &&
    headerVal.val &&
    messageVal.val
  ) {
    if (headerVal.val === messageVal.val) {
      // final check that i dont get spam emails
      // (this happened a lot on my old site.)
      return {
        valid: false,
        probs: {
          header: ['header and message cannot match']
        }
      };
    }
    // If it has not failed yet, all input is indeed valid.
    return {
      valid: true,
      values: {
        name: nameVal.val,
        email: emailVal.val,
        phone: phoneVal.val,
        header: headerVal.val,
        message: messageVal.val
      }
    };
  }
  const probs = {};
  if (!nameVal.val) probs.name = nameVal.probs;
  if (!emailVal.val) probs.email = emailVal.probs;
  if (!phoneVal.val) probs.phone = phoneVal.probs;
  if (!headerVal.val) probs.header = headerVal.probs;
  if (!messageVal.val) probs.message = messageVal.probs;
  return {
    valid: false,
    probs: probs
  };
};

module.exports = {
  validateName,
  validateEmail,
  validatePhone,
  validateHeader,
  validateMessage,
  validateAll
};
